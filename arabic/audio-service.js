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
function speak(text,opts={}){
  text=clean(text);
  if(!text||!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined')return false;
  const rate=Number.isFinite(opts.rate)?opts.rate:.70;
  try{window.speechSynthesis.resume()}catch(e){}
  try{window.speechSynthesis.cancel()}catch(e){}
  const u=new SpeechSynthesisUtterance(text);
  const voice=opts.voice||chooseVoice();
  if(voice){u.voice=voice;u.lang=voice.lang||'ar-SA'}else u.lang='ar-SA';
  u.rate=rate;u.pitch=1;
  try{window.speechSynthesis.speak(u);return true}catch(e){return false}
}
function preview(id,text='مَرْحَبًا، كَيْفَ حَالُكَ الْيَوْمَ؟'){
  const v=voices().find(x=>voiceId(x)===id);return speak(text,{rate:.74,voice:v||null});
}
function stop(){try{window.speechSynthesis?.cancel?.()}catch(e){}}
function currentVoice(){const v=chooseVoice();return v?{id:voiceId(v),name:v.name,lang:v.lang,voiceURI:v.voiceURI||''}:null}
const service={speak,stop,clean,chooseVoice,voices,voiceId,selectedId,setVoice,preview,currentVoice};
window.ARABIC_AUDIO_SERVICE=Object.freeze(service);
window.ARABIC_SPEAK_WORD=(text,rate=.70)=>speak(text,{rate});
// Bridge every legacy教材 call that still uses the original global speak().
// This is intentionally assigned after index.html has defined its legacy function.
try{window.speak=(text,rate)=>speak(text,{rate:Number.isFinite(rate)?rate:.70})}catch(e){}
})();