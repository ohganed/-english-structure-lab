(function(){
function getWordById(id){
  try{
    const x=(typeof s==='function')?s():null;
    return x?.words?.find(w=>w.id===id)||null;
  }catch(e){return null}
}
function cleanVisibleArabic(text){
  return String(text||'')
    .replace(/[🔊▶︎▶]/g,'')
    .replace(/\s+/g,' ')
    .trim();
}
function chooseArabicVoice(){
  try{
    const voices=window.speechSynthesis?.getVoices?.()||[];
    return voices.find(v=>/^ar(-|$)/i.test(v.lang||''))||
           voices.find(v=>/arab/i.test(v.name||''))||null;
  }catch(e){return null}
}
function speakArabic(text,rate=.70){
  text=cleanVisibleArabic(text);
  if(!text||!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined')return false;
  try{window.speechSynthesis.resume()}catch(e){}
  try{window.speechSynthesis.cancel()}catch(e){}
  const u=new SpeechSynthesisUtterance(text);
  u.lang='ar-SA';
  u.rate=rate;
  u.pitch=1;
  const voice=chooseArabicVoice();
  if(voice)u.voice=voice;
  try{
    window.speechSynthesis.speak(u);
    return true;
  }catch(e){return false}
}
function textForWordElement(el){
  const id=el?.dataset?.w;
  const w=id?getWordById(id):null;
  return w?.ttsText||w?.vocalized||w?.surface||el?.dataset?.tts||el?.dataset?.courseWord||el?.textContent||'';
}
function flash(el){
  if(!el)return;
  el.classList.add('wordSpeaking');
  setTimeout(()=>el.classList.remove('wordSpeaking'),420);
}
const st=document.createElement('style');
st.textContent='.word,.courseWord,[data-speak-ar]{cursor:pointer;touch-action:manipulation}.wordSpeaking{background:#dcefe9!important;box-shadow:0 0 0 2px rgba(31,111,97,.16);transition:background .15s,box-shadow .15s}.wordAudioHint{font-size:11px;color:#75807c;margin-top:8px}';
document.head.appendChild(st);

// Capture phase keeps pronunciation working even when later progressive-disclosure handlers stop propagation.
document.addEventListener('click',function(ev){
  const el=ev.target.closest?.('.word[data-w],.courseWord[data-course-word],[data-speak-ar]');
  if(!el)return;
  const text=el.dataset?.speakAr||textForWordElement(el);
  if(!text)return;
  speakArabic(text,el.classList.contains('courseWord')?.68:.70);
  flash(el);
},true);

const obs=new MutationObserver(()=>{
  const r=document.querySelector('#reader');
  if(!r||r.querySelector('.wordAudioHint')||!r.querySelector('.word[data-w]'))return;
  const hint=document.createElement('div');
  hint.className='wordAudioHint';
  hint.textContent='Tap a word to hear its pronunciation. · 単語を押すとその単語だけ発音します。';
  r.appendChild(hint);
});
obs.observe(document.body,{childList:true,subtree:true});

window.ARABIC_SPEAK_WORD=speakArabic;
})();
