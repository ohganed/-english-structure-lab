(function(){
const VOICE_KEY='asl.audio.voice.v1';
function clean(text){
  return String(text||'').replace(/[🔊▶︎▶]/g,'').replace(/\s+/g,' ').trim();
}
function voices(){
  try{return (window.speechSynthesis?.getVoices?.()||[]).filter(v=>/^ar(-|$)/i.test(v.lang||'')||/arab/i.test(v.name||''));}
  catch(e){return []}
}
function voiceId(v){return `${v.name}|||${v.lang}|||${v.voiceURI||''}`}
function selectedId(){try{return localStorage.getItem(VOICE_KEY)||''}catch(e){return ''}}
function chooseVoice(){
  const list=voices(),saved=selectedId();
  if(saved){const hit=list.find(v=>voiceId(v)===saved);if(hit)return hit}
  return list[0]||null;
}
function setVoice(id){
  try{if(id)localStorage.setItem(VOICE_KEY,id);else localStorage.removeItem(VOICE_KEY)}catch(e){}
  return chooseVoice();
}
function speak(text,opts={}){
  text=clean(text);
  if(!text||!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined')return false;
  const rate=Number.isFinite(opts.rate)?opts.rate:.70;
  try{window.speechSynthesis.resume()}catch(e){}
  try{window.speechSynthesis.cancel()}catch(e){}
  const u=new SpeechSynthesisUtterance(text);
  u.lang='ar-SA';u.rate=rate;u.pitch=1;
  const voice=opts.voice||chooseVoice();if(voice)u.voice=voice;
  try{window.speechSynthesis.speak(u);return true}catch(e){return false}
}
function preview(id,text='مَرْحَبًا، كَيْفَ حَالُكَ الْيَوْمَ؟'){
  const v=voices().find(x=>voiceId(x)===id);return speak(text,{rate:.74,voice:v||null});
}
function stop(){try{window.speechSynthesis?.cancel?.()}catch(e){}}
window.ARABIC_AUDIO_SERVICE=Object.freeze({speak,stop,clean,chooseVoice,voices,voiceId,selectedId,setVoice,preview});
window.ARABIC_SPEAK_WORD=(text,rate=.70)=>speak(text,{rate});
})();