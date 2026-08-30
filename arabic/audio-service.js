(function(){
const VOICE_KEY='asl.audio.voice.v2';
const OLD_VOICE_KEY='asl.audio.voice.v1';
function clean(text){
  return String(text||'').replace(/[🔊▶︎▶]/g,'').replace(/\s+/g,' ').trim();
}
function voices(){
  try{return (window.speechSynthesis?.getVoices?.()||[]).filter(v=>/^ar(-|$)/i.test(v.lang||'')||/arab/i.test(v.name||''));}
  catch(e){return []}
}
function voiceId(v){return `${v.name}|||${v.lang}|||${v.voiceURI||''}`}
function readSaved(){
  try{
    const raw=localStorage.getItem(VOICE_KEY);
    if(raw){try{return JSON.parse(raw)}catch(e){}}
    const old=localStorage.getItem(OLD_VOICE_KEY)||'';
    if(old){const [name='',lang='',voiceURI='']=old.split('|||');return {name,lang,voiceURI,id:old}}
  }catch(e){}
  return null;
}
function selectedId(){const s=readSaved();return s?.id||''}
function chooseVoice(){
  const list=voices(),saved=readSaved();
  if(saved){
    let hit=null;
    if(saved.voiceURI)hit=list.find(v=>v.voiceURI===saved.voiceURI&&(!saved.lang||v.lang===saved.lang));
    if(!hit&&saved.name&&saved.lang)hit=list.find(v=>v.name===saved.name&&v.lang===saved.lang);
    if(!hit&&saved.name)hit=list.find(v=>v.name===saved.name);
    if(!hit&&saved.id)hit=list.find(v=>voiceId(v)===saved.id);
    if(hit)return hit;
  }
  return list[0]||null;
}
function setVoice(id){
  const list=voices();const v=list.find(x=>voiceId(x)===id)||null;
  try{
    if(v){localStorage.setItem(VOICE_KEY,JSON.stringify({id:voiceId(v),name:v.name,lang:v.lang||'',voiceURI:v.voiceURI||''}));localStorage.removeItem(OLD_VOICE_KEY)}
    else{localStorage.removeItem(VOICE_KEY);localStorage.removeItem(OLD_VOICE_KEY)}
  }catch(e){}
  return chooseVoice();
}
function teachingText(text){
  const t=clean(text);
  if(!t)return t;
  // Many Arabic system voices apply pause pronunciation to an isolated word and
  // suppress a final short vowel. A short carrier keeps the target away from
  // utterance-final position. The carrier is only for teaching-mode playback.
  return `${t} الآنَ`;
}
function speak(text,opts={}){
  text=clean(text);
  if(!text||!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined')return false;
  const rate=Number.isFinite(opts.rate)?opts.rate:.70;
  const mode=opts.mode||'natural';
  const speechText=mode==='teaching'?teachingText(text):text;
  try{window.speechSynthesis.resume()}catch(e){}
  try{window.speechSynthesis.cancel()}catch(e){}
  const u=new SpeechSynthesisUtterance(speechText);
  const voice=opts.voice||chooseVoice();
  if(voice){u.voice=voice;u.lang=voice.lang||'ar-SA'}else u.lang='ar-SA';
  u.rate=rate;u.pitch=1;
  try{window.speechSynthesis.speak(u);return true}catch(e){return false}
}
function speakWord(text,opts={}){return speak(text,{...opts,mode:'teaching',rate:Number.isFinite(opts.rate)?opts.rate:.68})}
function speakSentence(text,opts={}){return speak(text,{...opts,mode:'natural'})}
function preview(id,text='مَرْحَبًا، كَيْفَ حَالُكَ الْيَوْمَ؟'){
  const v=voices().find(x=>voiceId(x)===id);return speakSentence(text,{rate:.74,voice:v||null});
}
function stop(){try{window.speechSynthesis?.cancel?.()}catch(e){}}
function currentVoice(){const v=chooseVoice();return v?{id:voiceId(v),name:v.name,lang:v.lang,voiceURI:v.voiceURI||''}:null}
const service={speak,speakWord,speakSentence,stop,clean,teachingText,chooseVoice,voices,voiceId,selectedId,setVoice,preview,currentVoice};
window.ARABIC_AUDIO_SERVICE=Object.freeze(service);
window.ARABIC_SPEAK_WORD=(text,rate=.68)=>speakWord(text,{rate});
// Legacy sentence playback remains natural. Word taps are routed by word-audio.js.
try{window.speak=(text,rate)=>speakSentence(text,{rate:Number.isFinite(rate)?rate:.70})}catch(e){}
})();