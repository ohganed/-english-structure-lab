(function(){
'use strict';

const KEY='asl.knowledge.v1';
const AIK='asl.ai.corpus.v1';
const SCHEMA='Arabic Structure Lab Knowledge v0.1';
const HARAKAT=/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const PUNCT=/[.،؟!?؛:«»“”"'()\[\]{}…ـ]/g;

function normalizeArabic(value){
  return String(value||'')
    .normalize('NFC')
    .replace(HARAKAT,'')
    .replace(PUNCT,'')
    .trim();
}

function readStore(){
  try{
    const parsed=JSON.parse(localStorage.getItem(KEY)||'{}');
    if(parsed&&parsed.schema===SCHEMA&&parsed.entries)return parsed;
  }catch{}
  return {schema:SCHEMA,updatedAt:null,entries:{},forms:{}};
}

function writeStore(store){
  store.schema=SCHEMA;
  store.updatedAt=new Date().toISOString();
  localStorage.setItem(KEY,JSON.stringify(store));
  return store;
}

function asMeaningObject(value){
  if(!value)return null;
  if(typeof value==='string')return {en:value};
  if(typeof value==='object')return {
    en:value.en||'',
    ja:value.ja||'',
    ar:value.ar||''
  };
  return null;
}

function stablePattern(pattern){
  if(!pattern)return null;
  if(typeof pattern==='string')return pattern;
  if(typeof pattern!=='object')return null;
  const keep=['formNumber','patternArabic','patternTransliteration','typicalMeaning','name','form'];
  const out={};
  for(const k of keep)if(pattern[k]!=null&&pattern[k]!=='')out[k]=pattern[k];
  return Object.keys(out).length?out:null;
}

function posOf(word){
  const p=word?.partOfSpeech||word?.pos;
  if(typeof p==='string')return {en:p};
  if(p&&typeof p==='object')return {ar:p.ar||'',en:p.en||'',ja:p.ja||''};
  return null;
}

function lexicalRecord(word,docMeta){
  const surface=String(word?.surface||'').trim();
  const lemma=String(word?.lemmaVocalized||word?.lemma||surface).trim();
  const key=normalizeArabic(word?.lemma||surface);
  if(!surface||!key)return null;
  return {
    key,
    lemma:word?.lemma||normalizeArabic(lemma)||surface,
    lemmaVocalized:word?.lemmaVocalized||lemma||'',
    root:word?.root||null,
    rootMeaning:asMeaningObject(word?.rootMeaning),
    partOfSpeech:posOf(word),
    pattern:stablePattern(word?.pattern),
    wordFamily:Array.isArray(word?.wordFamily)?word.wordFamily.slice(0,12):[],
    senses:[{
      surface,
      vocalized:word?.vocalized||surface,
      meaning:asMeaningObject(word?.meaning),
      sourceHash:docMeta.sourceHash,
      sourceTitle:docMeta.title,
      observedAt:docMeta.observedAt
    }],
    provenance:{
      source:'AI Corpus',
      schemaVersion:docMeta.schemaVersion||null,
      analysisPromptVersion:docMeta.analysisPromptVersion||null,
      verified:false
    }
  };
}

function mergeSense(existing,incoming){
  const seen=new Set((existing.senses||[]).map(s=>JSON.stringify([normalizeArabic(s.surface),s.meaning?.en||'',s.meaning?.ja||''])));
  for(const sense of incoming.senses||[]){
    const sig=JSON.stringify([normalizeArabic(sense.surface),sense.meaning?.en||'',sense.meaning?.ja||'']);
    if(!seen.has(sig)){existing.senses.push(sense);seen.add(sig)}
  }
  existing.senses=(existing.senses||[]).slice(-20);
}

function mergeRecord(existing,incoming){
  if(!existing)return incoming;
  for(const k of ['lemma','lemmaVocalized','root','rootMeaning','partOfSpeech','pattern']){
    if((existing[k]==null||existing[k]===''||Object.keys(existing[k]||{}).length===0)&&incoming[k])existing[k]=incoming[k];
  }
  if((!existing.wordFamily||!existing.wordFamily.length)&&incoming.wordFamily?.length)existing.wordFamily=incoming.wordFamily;
  mergeSense(existing,incoming);
  return existing;
}

function simpleHash(text){
  let h=2166136261;
  for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}
  return (h>>>0).toString(16).padStart(8,'0');
}

function ingestDocument(doc){
  if(!doc||!Array.isArray(doc.sentences))return {added:0,updated:0,forms:0};
  const store=readStore();
  const observedAt=new Date().toISOString();
  const sourceText=String(doc.originalText||doc.title||JSON.stringify(doc.sentences.map(s=>s.text||'')));
  const meta={
    sourceHash:simpleHash(sourceText),
    title:doc.title||'Arabic text',
    observedAt,
    schemaVersion:doc.schemaVersion||null,
    analysisPromptVersion:doc.analysisPromptVersion||'v1.1'
  };
  let added=0,updated=0,forms=0;
  for(const sentence of doc.sentences){
    for(const word of sentence.words||[]){
      const incoming=lexicalRecord(word,meta);if(!incoming)continue;
      const had=!!store.entries[incoming.key];
      store.entries[incoming.key]=mergeRecord(store.entries[incoming.key],incoming);
      had?updated++:added++;
      for(const form of [word.surface,word.vocalized,word.lemma,word.lemmaVocalized]){
        const f=normalizeArabic(form);if(f){store.forms[f]=incoming.key;forms++}
      }
    }
  }
  writeStore(store);
  return {added,updated,forms};
}

function lookup(surface){
  const store=readStore(),form=normalizeArabic(surface),key=store.forms[form]||form;
  return store.entries[key]||null;
}

function tokenizeArabic(text){
  return String(text||'').split(/\s+/).map(normalizeArabic).filter(Boolean);
}

function promptContext(text){
  const tokens=[...new Set(tokenizeArabic(text))];
  const hits=[];
  for(const token of tokens){
    const item=lookup(token);if(!item)continue;
    hits.push({
      surface:token,
      lemma:item.lemma,
      lemmaVocalized:item.lemmaVocalized||'',
      root:item.root||null,
      partOfSpeech:item.partOfSpeech||null,
      pattern:item.pattern||null,
      knownSenses:(item.senses||[]).slice(-4).map(s=>s.meaning).filter(Boolean),
      provenance:item.provenance||null
    });
  }
  if(!hits.length)return '';
  return `\n\n⸻\n\nKNOWN LEXICAL FACTS — reuse before generating new lexical analysis\n\nThe following facts were already analyzed in earlier Arabic Structure Lab material. Treat them as reusable lexical hints, not as sentence-specific truth. Re-check contextual meaning, syntax, case/iʿrāb, clitic boundaries, and sense choice in the new sentence. Do not invent agreement with the cache when the current context differs.\n\n${JSON.stringify(hits,null,2)}\n`;
}

function ingestExistingAICorpus(){
  let items=[];try{items=JSON.parse(localStorage.getItem(AIK)||'[]')}catch{}
  if(!Array.isArray(items))return {documents:0};
  let documents=0,added=0,updated=0;
  for(const item of items){
    const d=item?.d||item?.data;if(!d)continue;
    const r=ingestDocument(d);documents++;added+=r.added;updated+=r.updated;
  }
  return {documents,added,updated};
}

function stats(){
  const store=readStore();
  return {
    schema:store.schema,
    entries:Object.keys(store.entries||{}).length,
    forms:Object.keys(store.forms||{}).length,
    updatedAt:store.updatedAt
  };
}

window.ARABIC_KB={
  schema:SCHEMA,
  normalizeArabic,
  ingestDocument,
  ingestExistingAICorpus,
  lookup,
  promptContext,
  stats,
  export(){return readStore()},
  clear(){localStorage.removeItem(KEY)}
};

try{ingestExistingAICorpus()}catch(err){console.warn('Arabic KB migration skipped',err)}
})();
