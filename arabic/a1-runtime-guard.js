(function(){
  function allA1(){
    return [window.ARABIC_A1_BATCH1,window.ARABIC_A1_BATCH2,window.ARABIC_A1_BATCH3,window.ARABIC_A1_EXPANSION]
      .flatMap(x=>x?.experiences||[]);
  }
  function chapterIds(){return (window.ARABIC_A1_CHAPTERS||[]).map(c=>c.id)}
  function audit(){
    const all=allA1();
    const expected={0:'a1e001',49:'a1e050',50:'a1e051',99:'a1e100',100:'a1e101',149:'a1e150',150:'a1e151',199:'a1e200',749:'a1e750'};
    const bad=[];
    if(all.length!==750)bad.push(`count=${all.length}`);
    for(const [i,id] of Object.entries(expected))if(all[+i]?.[0]!==id)bad.push(`${+i+1}:${all[+i]?.[0]||'missing'}!=${id}`);
    for(const id of ['A1.1','A1.2','A1.3','A1.4'])if(!chapterIds().includes(id))bad.push(`chapter ${id} missing`);
    return {ok:bad.length===0,count:all.length,bad};
  }
  const result=audit();
  window.ARABIC_A1_RUNTIME_AUDIT=result;
  if(result.ok){try{sessionStorage.removeItem('asl.a1.repair.once')}catch(e){};return}
  console.error('[Arabic Structure Lab] A1 runtime audit failed',result);
  let retried=false;try{retried=sessionStorage.getItem('asl.a1.repair.once')==='1'}catch(e){}
  if(!retried){
    try{sessionStorage.setItem('asl.a1.repair.once','1')}catch(e){}
    const u=new URL(location.href);u.searchParams.set('a1repair',String(Date.now()));location.replace(u.toString());return;
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const d=document.createElement('div');d.id='a1RuntimeWarning';d.style.cssText='position:fixed;z-index:9999;left:12px;right:12px;bottom:12px;padding:12px 14px;border-radius:14px;background:#fff2d8;border:1px solid #e7c47a;color:#5b4520;font:13px/1.5 system-ui';d.textContent='A1 course data did not load completely. Please reload once with a network connection. The source lessons are still present.';document.body.appendChild(d);
  });
})();
