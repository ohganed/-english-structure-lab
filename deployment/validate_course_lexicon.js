const fs=require('fs'),vm=require('vm');global.window=global;window.ARABIC_AUDIT_LEXICON={};
for(const f of ['arabic/word-declension.js','arabic/course-lexicon-pack.js','arabic/course-lexicon-bridge.js'])vm.runInThisContext(fs.readFileSync(f,'utf8'),{filename:f});
const words=['عِنْدَمَا','الْفُنْدُقِ','كُنْتُ','مُتْعَبًا','مَرْيَمَ','سَاعَدَتْنِي','فَتَغَيَّرَتْ','خُطَّتِي'];
const bad=[];
for(const w of words){const d=window.ARABIC_WORD_DEPTH.lookup(w);if(!d||d.pos==='Unknown'||!d.en||d.en==='Meaning not yet audited')bad.push(w);else console.log('[PASS]',w,'=>',d.en,'/',d.lemma||'');}
if(bad.length){console.error('[FAIL] unresolved Course words:',bad.join(' '));process.exit(1)}
console.log('RESULT: PASS — current B1 Course sentence has meaning coverage');
