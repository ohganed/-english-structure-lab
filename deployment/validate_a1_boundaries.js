const fs=require('fs'),vm=require('vm');
global.window=global;
for(const f of ['arabic/a1-batch1.js','arabic/a1-batch2.js','arabic/a1-batch3.js','arabic/a1-expansion.js','arabic/a1-chapters.js']){
  vm.runInThisContext(fs.readFileSync(f,'utf8'),{filename:f});
}
const rowsOf=x=>Array.isArray(x)?x:(x?.experiences||[]);
const rowId=r=>Array.isArray(r)?r[0]:(r?.id||r?.experienceId||r?.experience_id||null);
const all=[window.ARABIC_A1_BATCH1,window.ARABIC_A1_BATCH2,window.ARABIC_A1_BATCH3,window.ARABIC_A1_EXPANSION].flatMap(rowsOf);
const expected={0:'a1e001',49:'a1e050',50:'a1e051',99:'a1e100',100:'a1e101',149:'a1e150',150:'a1e151',199:'a1e200',749:'a1e750'};
const fail=[];
if(all.length!==750)fail.push(`count=${all.length}`);
for(const [i,id] of Object.entries(expected)){
  const got=rowId(all[+i]);
  if(got!==id)fail.push(`${+i+1}:${got||'missing'} != ${id}`);
}
const chapters=window.ARABIC_A1_CHAPTERS||[];
for(const [id,start,end] of [['A1.1',1,50],['A1.2',51,100],['A1.3',101,150],['A1.4',151,200]]){
  const c=chapters.find(x=>x.id===id);
  if(!c||c.start!==start||c.end!==end)fail.push(`${id} boundary invalid`);
}
if(fail.length){console.error('[FAIL] A1 boundary audit',fail);process.exit(1)}
console.log('[PASS] A1.1-A1.4 and full A1 boundaries are intact');
