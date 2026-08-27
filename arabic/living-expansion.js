(function(){
function attach(){try{const x=window.ARABIC_A1_EXPANSION?.experiences||[];if(!x.length||typeof D==='undefined'||typeof norm!=='function')return;const known=new Set(D.map(e=>e.id));x.forEach((e,k)=>{if(!known.has(e[0]))D.push(norm(e,151+k))});if(typeof render==='function')render()}catch(e){console.warn('A1 expansion attach failed',e)}}
if(window.ARABIC_A1_EXPANSION){attach();return}
const s=document.createElement('script');s.src='./a1-expansion.js';s.onload=attach;s.onerror=()=>console.warn('A1 expansion could not be loaded');document.head.appendChild(s);
})();