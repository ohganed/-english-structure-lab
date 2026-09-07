const fs=require('fs'),vm=require('vm');
global.window=global;
const load=f=>vm.runInThisContext(fs.readFileSync(f,'utf8'),{filename:f});
for(const f of [
  'arabic/a1-batch1.js','arabic/a1-batch2.js','arabic/a1-batch3.js','arabic/a1-expansion.js','arabic/a1-chapters.js','arabic/cefr-curriculum.js',
  'arabic/word-declension.js','arabic/course-lexicon-pack.js','arabic/course-lexicon-pack2.js','arabic/course-lexicon-pack3.js','arabic/course-lexicon-pack4.js','arabic/course-lexicon-bridge.js','arabic/verb-conjugation-full.js','arabic/verb-conjugation-corpus-pack.js'
]) load(f);

const punct=/^[«“\[(]+|[.،؟!?؛:»”\])]+$/g;
const clean=s=>String(s||'').replace(punct,'').trim();
const tokens=s=>String(s||'').split(/\s+/).map(clean).filter(Boolean);
const key=s=>String(s||'').normalize('NFC');
function resolved(word){
  const v=window.ARABIC_VERB_FULL?.lookup?.(word);
  if(v&&v.en)return {ok:true,source:'verb',en:v.en};
  const d=window.ARABIC_WORD_DEPTH?.lookup?.(word);
  const en=d?.en||d?.meaning?.en||'';
  const bad=!en||/not yet audited|unknown/i.test(String(en));
  return {ok:!bad,source:bad?'unresolved':'word-depth',en};
}
const rows=[];
const a1=[window.ARABIC_A1_BATCH1,window.ARABIC_A1_BATCH2,window.ARABIC_A1_BATCH3,window.ARABIC_A1_EXPANSION].flatMap(x=>x?.experiences||[]);
for(const r of a1)rows.push({level:'A1',id:r?.[0],ar:r?.[4]});
for(const level of ['A2','B1','B2','C1','C2']){
  const ex=window.ARABIC_CEFR_LEVELS?.[level]?.experiences||[];
  for(const r of ex)rows.push({level,id:r?.[0],ar:r?.[4]});
}
const stats=new Map();let totalTokens=0,resolvedTokens=0;
for(const row of rows){
  for(const word of tokens(row.ar)){
    totalTokens++;
    const r=resolved(word);
    if(r.ok){resolvedTokens++;continue}
    const k=key(word);const s=stats.get(k)||{word:k,count:0,levels:new Set(),examples:[]};
    s.count++;s.levels.add(row.level);if(s.examples.length<3)s.examples.push(`${row.level} ${row.id}: ${row.ar}`);stats.set(k,s);
  }
}
const unresolved=[...stats.values()].sort((a,b)=>b.count-a.count||a.word.localeCompare(b.word));
const uniqueAll=new Set(rows.flatMap(r=>tokens(r.ar).map(key))).size;
const uniqueUnresolved=unresolved.length;
const coverage=totalTokens?resolvedTokens/totalTokens*100:0;
console.log(`[COURSE WORD AUDIT] experiences=${rows.length} totalTokens=${totalTokens} uniqueTokens=${uniqueAll}`);
console.log(`[COURSE WORD AUDIT] resolvedTokens=${resolvedTokens} coverage=${coverage.toFixed(2)}% uniqueUnresolved=${uniqueUnresolved}`);
console.log('[COURSE WORD AUDIT] unresolved by frequency:');
for(const s of unresolved.slice(0,250)){
  console.log(`- ${s.word} | count=${s.count} | levels=${[...s.levels].join(',')} | ${s.examples[0]||''}`);
}
const report={experiences:rows.length,totalTokens,uniqueTokens:uniqueAll,resolvedTokens,coverage:+coverage.toFixed(2),uniqueUnresolved,unresolved:unresolved.map(s=>({word:s.word,count:s.count,levels:[...s.levels],examples:s.examples}))};
fs.mkdirSync('deployment/reports',{recursive:true});
fs.writeFileSync('deployment/reports/course-word-meaning-audit.json',JSON.stringify(report,null,2));
if(rows.length!==4500){console.error(`[FAIL] expected 4500 experiences, got ${rows.length}`);process.exit(1)}
if(uniqueUnresolved!==0){console.error(`[FAIL] expected 100% Course meaning coverage, unresolved=${uniqueUnresolved}`);process.exit(1)}
console.log('[PASS] full A1-C2 course meaning audit completed at 100% coverage');
