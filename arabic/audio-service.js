(function(){
function clean(text){
  return String(text||'').replace(/[🔊▶︎▶]/g,'').replace(/\s+/g,' ').trim();
}
function chooseVoice(){
  try{
    const voices=window.speechSynthesis?.getVoices?.()||[];
    return voices.find(v=>/^ar(-|$)/i.test(v.lang||''))||voices.find(v=>/arab/i.test(v.name||''))||null;
  }catch(e){return null}
}
function speak(text,opts={}){
  text=clean(text);
  if(!text||!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined')return false;
  const rate=Number.isFinite(opts.rate)?opts.rate:.70;
  try{window.speechSynthesis.resume()}catch(e){}
  try{window.speechSynthesis.cancel()}catch(e){}
  const u=new SpeechSynthesisUtterance(text);
  u.lang='ar-SA';u.rate=rate;u.pitch=1;
  const voice=chooseVoice();if(voice)u.voice=voice;
  try{window.speechSynthesis.speak(u);return true}catch(e){return false}
}
function stop(){try{window.speechSynthesis?.cancel?.()}catch(e){}}
window.ARABIC_AUDIO_SERVICE=Object.freeze({speak,stop,clean,chooseVoice});
window.ARABIC_SPEAK_WORD=(text,rate=.70)=>speak(text,{rate});
})();