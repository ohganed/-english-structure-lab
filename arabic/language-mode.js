(function(){
const K='asl.support.language.v1';
let mode=localStorage.getItem(K)||'en-ja';
const css=document.createElement('style');
css.textContent=`body.asl-en-only .courseJa,body.asl-en-only .courseChapterJa,body.asl-en-only .adSmall[data-ja],body.asl-en-only .nomSmall[data-ja],body.asl-en-only [data-support-ja]{display:none!important}.aslLangSwitch{display:flex;gap:5px;align-items:center}.aslLangBtn{border:1px solid #d9d4ca;background:#fff;border-radius:11px;padding:7px 9px;font-size:12px;font-weight:800}.aslLangBtn.on{background:#20302d;color:white;border-color:#20302d}`;
document.head.appendChild(css);
function apply(){document.body.classList.toggle('asl-en-only',mode==='en');document.querySelectorAll('[data-asl-lang]').forEach(b=>b.classList.toggle('on',b.dataset.aslLang===mode));localStorage.setItem(K,mode);rewriteCourse();}
function switcher(){const w=document.createElement('div');w.className='aslLangSwitch';w.innerHTML='<button class="aslLangBtn" data-asl-lang="en">EN</button><button class="aslLangBtn" data-asl-lang="en-ja">EN+JA</button>';w.querySelectorAll('[data-asl-lang]').forEach(b=>b.onclick=()=>{mode=b.dataset.aslLang;apply()});return w}
function mount(){const top=document.querySelector('#courseModal .courseTop');if(top&&!top.querySelector('.aslLangSwitch'))top.insertBefore(switcher(),top.lastElementChild);const base=document.querySelector('.top');if(base&&!base.querySelector('.aslLangSwitch'))base.insertBefore(switcher(),base.firstChild);apply()}
function rewriteCourse(){if(mode!=='en')return;document.querySelectorAll('#courseChapterSelect option').forEach(o=>{o.textContent=o.textContent.replace(/\s*\/\s*[^/]+$/,'')});document.querySelectorAll('#courseBody .courseJa,#courseBody .courseChapterJa').forEach(e=>e.style.display='none');}
new MutationObserver(()=>{mount();rewriteCourse()}).observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener('DOMContentLoaded',mount);
window.ARABIC_SUPPORT_LANGUAGE={get:()=>mode,set:m=>{if(m==='en'||m==='en-ja'){mode=m;apply()}}};
})();
