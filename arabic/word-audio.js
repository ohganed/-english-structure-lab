(function(){
function getWordById(id){
  try{
    const x=(typeof s==='function')?s():null;
    return x?.words?.find(w=>w.id===id)||null;
  }catch(e){return null}
}
function textForWordElement(el){
  const id=el?.dataset?.w;
  const w=id?getWordById(id):null;
  return w?.ttsText||w?.vocalized||w?.surface||el?.dataset?.tts||el?.dataset?.speakAr||el?.dataset?.courseWord||el?.textContent||'';
}
function flash(el){
  if(!el)return;
  el.classList.add('wordSpeaking');
  setTimeout(()=>el.classList.remove('wordSpeaking'),420);
}
const st=document.createElement('style');
st.textContent='.word,.courseWord,[data-speak-ar]{cursor:pointer;touch-action:manipulation}.wordSpeaking{background:#dcefe9!important;box-shadow:0 0 0 2px rgba(31,111,97,.16);transition:background .15s,box-shadow .15s}';
document.head.appendChild(st);

document.addEventListener('click',function(ev){
  const el=ev.target.closest?.('.word[data-w],.word[data-speak-ar],.courseWord[data-course-word],[data-speak-ar]');
  if(!el)return;
  const text=el.dataset?.speakAr||textForWordElement(el);
  if(!text)return;
  const rate=el.classList.contains('courseWord')?.68:.70;
  const svc=window.ARABIC_AUDIO_SERVICE;
  if(svc?.speakWord)svc.speakWord(text,{rate});else svc?.speak?.(text,{rate});
  flash(el);
},true);
})();