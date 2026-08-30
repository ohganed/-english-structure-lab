(function(){
function repairOffsets(d){
  for(const s of d?.sentences||[]){
    const text=String(s.text||'');
    let cursor=0;
    for(const w of s.words||[]){
      const surface=String(w?.surface||'');
      if(!surface)continue;
      let pos=text.indexOf(surface,cursor);
      if(pos<0)pos=text.indexOf(surface);
      if(pos>=0){w.start=pos;w.end=pos+surface.length;cursor=w.end}else{delete w.start;delete w.end}
    }
    cursor=0;
    for(const c of s.chunks||[]){
      const chunk=String(c?.text||'');
      if(!chunk)continue;
      let pos=text.indexOf(chunk,cursor);
      if(pos<0)pos=text.indexOf(chunk);
      if(pos>=0){c.start=pos;c.end=pos+chunk.length;cursor=c.end}else{delete c.start;delete c.end}
    }
  }
  return d;
}
const oldValidate=typeof validate==='function'?validate:null;
if(oldValidate){validate=function(d){repairOffsets(d);return oldValidate(d)}}
try{
  const key='asl.ai.corpus.v1';
  const items=JSON.parse(localStorage.getItem(key)||'[]');
  let changed=false;
  for(const item of items){if(item?.d){repairOffsets(item.d);changed=true}}
  if(changed)localStorage.setItem(key,JSON.stringify(items));
}catch{}
window.ARABIC_CORPUS_NORMALIZE=repairOffsets;
})();
