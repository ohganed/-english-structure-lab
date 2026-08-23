(function(){
function getWordById(id){
  try{
    const x=(typeof s==='function')?s():null;
    return x?.words?.find(w=>w.id===id)||null;
  }catch(e){return null}
}
function speakWord(w){
  if(!w||!('speechSynthesis' in window))return;
  const text=w.ttsText||w.vocalized||w.surface||'';
  if(!text)return;
  try{speechSynthesis.cancel()}catch(e){}
  const u=new SpeechSynthesisUtterance(text);
  u.lang='ar-SA';
  u.rate=.72;
  u.pitch=1;
  try{
    const voices=speechSynthesis.getVoices();
    const ar=voices.find(v=>/^ar(-|$)/i.test(v.lang||''));
    if(ar)u.voice=ar;
  }catch(e){}
  speechSynthesis.speak(u);
}
function flash(el){
  el.classList.add('wordSpeaking');
  setTimeout(()=>el.classList.remove('wordSpeaking'),420);
}
const st=document.createElement('style');
st.textContent='.word{cursor:pointer}.wordSpeaking{background:#dcefe9!important;box-shadow:0 0 0 2px rgba(31,111,97,.16);transition:background .15s,box-shadow .15s}.wordAudioHint{font-size:11px;color:#75807c;margin-top:8px}';
document.head.appendChild(st);

document.addEventListener('click',function(ev){
  const el=ev.target.closest?.('.word[data-w]');
  if(!el)return;
  const w=getWordById(el.dataset.w);
  if(!w)return;
  speakWord(w);
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
})();