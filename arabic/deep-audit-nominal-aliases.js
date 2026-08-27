(function(){
const A=window.ARABIC_NOMINAL_ANALYSIS, N=A?.lexicon;if(!N)return;
const entries=Object.entries(N).filter(([k])=>!k.includes(' '));
const endings=['ُ','َ','ِ','ٌ','ً','ٍ'];
for(const [k,v] of entries){
  for(const e of endings)if(!N[k+e])N[k+e]=v;
  for(const p of ['ال','الْ']){
    if(!N[p+k])N[p+k]=v;
    for(const e of endings)if(!N[p+k+e])N[p+k+e]=v;
  }
}
window.ARABIC_NOMINAL_ALIASES_READY=true;
})();