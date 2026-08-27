(function(){
const CURATED={
'أَنْ':{type:'particle',en:'subordinator / verbal-noun particle',ja:'接続詞・動名詞化を導く不変化詞',syntax:'Usually governs a following imperfect in the subjunctive (منصوب).'},
'لِأَنَّ':{type:'connector',en:'because',ja:'〜なので',syntax:'Introduces a causal clause; أنَّ-type particle with accusative subject and nominative predicate in traditional analysis.'},
'إِذَا':{type:'connector',en:'if / when',ja:'もし〜なら／〜するとき',syntax:'Often introduces a real/open or future-linked condition; it does not itself juss the following verb.'},
'عِنْدَمَا':{type:'connector',en:'when',ja:'〜するとき',syntax:'Temporal subordinator linking events.'},
'لَكِنَّ':{type:'connector',en:'but / however',ja:'しかし',syntax:'أنَّ-family particle; commonly takes an accusative subject and nominative predicate.'},
'لَكِنْ':{type:'connector',en:'but',ja:'しかし',syntax:'Conjunction; unlike لكنَّ it does not govern a nominal subject as an إنّ-sister.'},
'مَعَ':{type:'preposition/adverbial',en:'with',ja:'〜と／〜とともに',syntax:'Often followed by a genitive nominal; in مع أنَّ forms a concessive frame.'},
'قَدْ':{type:'particle',en:'aspect/epistemic particle',ja:'完了・可能性などを示す助詞',syntax:'With perfect often reinforces completedness; with imperfect can mark possibility/probability depending on context.'},
'لَمْ':{type:'particle',en:'past negator',ja:'過去否定',syntax:'Governs imperfect in the jussive (مجزوم).'},
'لَنْ':{type:'particle',en:'future-oriented negator',ja:'未来否定',syntax:'Governs imperfect in the subjunctive (منصوب).'},
'لَا':{type:'particle',en:'negation / prohibition depending on construction',ja:'否定／禁止',syntax:'Ordinary present negation does not itself juss; prohibitive لا does govern jussive.'},
'كَانَ':{type:'verb',en:'was / used to be',ja:'〜だった',root:'ك و ن',form:'Form I, hollow verb',syntax:'Copular verb; traditionally raises its subject (اسم كان) and assigns accusative to its predicate (خبر كان).'},
'كَانَتْ':{type:'verb',en:'she/it was',ja:'彼女／それは〜だった',root:'ك و ن',form:'Form I, hollow verb; feminine perfect'},
'كُنْتُ':{type:'verb',en:'I was',ja:'私は〜だった',root:'ك و ن',form:'Form I, hollow verb; 1sg perfect'},
'أَصْبَحَ':{type:'verb',en:'became',ja:'〜になった',root:'ص ب ح',form:'Form IV',syntax:'Can behave as a copular verb like كان in many constructions.'},
'أَصْبَحْتُ':{type:'verb',en:'I became',ja:'私は〜になった',root:'ص ب ح',form:'Form IV; 1sg perfect'},
'يُمْكِنُ':{type:'verb',en:'it is possible / can',ja:'可能である／〜できる',root:'م ك ن',form:'Form IV lexicalized impersonal use'},
'يَجِبُ':{type:'verb',en:'must / it is necessary',ja:'〜しなければならない',root:'و ج ب',form:'Form I impersonal/modal use'},
'يَنْبَغِي':{type:'verb',en:'should / ought to',ja:'〜すべきだ',root:'ب غ ي',form:'Lexical modal verb; weak/defective morphology',confidence:'high'},
'ذَهَبَ':{type:'verb',en:'went',ja:'行った',root:'ذ ه ب',form:'Form I; perfect 3ms'},
'يَذْهَبُ':{type:'verb',en:'goes',ja:'行く',root:'ذ ه ب',form:'Form I; imperfect 3ms'},
'سَأَذْهَبُ':{type:'verb',en:'I will go',ja:'私は行くつもりだ',root:'ذ ه ب',form:'Form I; future سـ + 1sg imperfect'},
'وَصَلَ':{type:'verb',en:'arrived',ja:'到着した',root:'و ص ل',form:'Form I; perfect'},
'وَصَلْتُ':{type:'verb',en:'I arrived',ja:'私は到着した',root:'و ص ل',form:'Form I; 1sg perfect'},
'عَادَ':{type:'verb',en:'returned',ja:'戻った',root:'ع و د',form:'Form I, hollow verb'},
'يَعُودُ':{type:'verb',en:'returns',ja:'戻る',root:'ع و د',form:'Form I, hollow verb; imperfect'},
'قَالَ':{type:'verb',en:'said',ja:'言った',root:'ق و ل',form:'Form I, hollow verb'},
'يَقُولُ':{type:'verb',en:'says',ja:'言う',root:'ق و ل',form:'Form I, hollow verb; imperfect'},
'فَهِمَ':{type:'verb',en:'understood',ja:'理解した',root:'ف ه م',form:'Form I'},
'أَفْهَمُ':{type:'verb',en:'I understand',ja:'私は理解する',root:'ف ه م',form:'Form I; 1sg imperfect'},
'أَرَادَ':{type:'verb',en:'wanted',ja:'望んだ',root:'ر و د',form:'Form IV, weak root'},
'أُرِيدُ':{type:'verb',en:'I want',ja:'私は欲しい／望む',root:'ر و د',form:'Form IV, weak root; 1sg imperfect'},
'اِسْتَطَاعَ':{type:'verb',en:'was able',ja:'できた',root:'ط و ع',form:'Form X, weak morphology'},
'أَسْتَطِيعُ':{type:'verb',en:'I can',ja:'私はできる',root:'ط و ع',form:'Form X, weak morphology; 1sg imperfect'},
'تَحَدَّثَ':{type:'verb',en:'spoke / conversed',ja:'話した',root:'ح د ث',form:'Form V'},
'تَحَدَّثْتُ':{type:'verb',en:'I spoke',ja:'私は話した',root:'ح د ث',form:'Form V; 1sg perfect'},
'غَيَّرَ':{type:'verb',en:'changed',ja:'変えた',root:'غ ي ر',form:'Form II'},
'غَيَّرْتُ':{type:'verb',en:'I changed',ja:'私は変えた',root:'غ ي ر',form:'Form II; 1sg perfect'},
'سَاعَدَ':{type:'verb',en:'helped',ja:'助けた',root:'س ع د',form:'Form III'},
'سَاعَدَنِي':{type:'verb',en:'helped me',ja:'私を助けた',root:'س ع د',form:'Form III + 1sg object suffix -ني'},
'يَبْدُو':{type:'verb',en:'seems / appears',ja:'〜のように見える',root:'ب د و',form:'Form I, weak verb'},
'يَخْلُقُ':{type:'verb',en:'creates',ja:'生み出す',root:'خ ل ق',form:'Form I; imperfect'},
'تُشِيرُ':{type:'verb',en:'indicates',ja:'示す',root:'ش و ر',form:'Form IV; imperfect'},
'نَأْخُذْ':{type:'verb',en:'we take',ja:'私たちは取る',root:'أ خ ذ',form:'Form I; jussive 1pl'},
'نَجِدْ':{type:'verb',en:'we find',ja:'私たちは見つける',root:'و ج د',form:'Form I; jussive 1pl'},
'نَذْهَبَ':{type:'verb',en:'we go',ja:'私たちは行く',root:'ذ ه ب',form:'Form I; subjunctive 1pl'},
'نَنْتَظِرَ':{type:'verb',en:'we wait',ja:'私たちは待つ',root:'ن ظ ر',form:'Form VIII; subjunctive 1pl'}
};
const PHRASES=[
['مَعَ أَنَّ','concession','譲歩','Sets up “although/even though …”.'],['رَغْمَ أَنَّ','concession','譲歩','Introduces a concessive clause.'],['مِنْ جِهَةٍ أُخْرَى','counter-framing','別の観点','Signals a second or contrasting perspective.'],['مِنْ جِهَةٍ','framing','一方の観点','Introduces one side of an argument.'],['فِي رَأْيِي','stance','話者の立場','Explicitly marks the speaker/writer’s opinion.'],['مِنَ الْمُحْتَمَلِ','epistemic stance','可能性判断','Marks uncertainty or probability.'],['مِنَ الضَّرُورِيِّ','necessity framing','必要性','Frames a proposition as necessary.'],['بِالرَّغْمِ مِنْ','concession','譲歩','Prepositional concessive expression.'],['إِلَّا أَنَّ','qualification / contrast','限定・対比','Restricts or contrasts the preceding proposition.'],['بَعْدَ أَنْ','temporal sequence','〜した後で','Links a later event to a completed preceding event.'],['قَبْلَ أَنْ','temporal sequence','〜する前に','Links an earlier event to a following event.'],['مِنْ نَاحِيَةٍ','framing','観点提示','Introduces one analytical perspective.']
];
function clean(s){return String(s||'').replace(/[.،؟!?؛:«»“”]/g,'').trim()}
function bare(s){return clean(s).replace(/^[وف]/,'')}
function words(ar){return clean(ar).split(/\s+/).filter(Boolean)}
function info(w){const b=bare(w),c=CURATED[clean(w)]||CURATED[b];const notes=[];if(/^و/.test(w)&&w.length>2)notes.push('Initial وَ may be an attached conjunction.');if(/^ف/.test(w)&&w.length>2)notes.push('Initial فَ may mark sequence/result and is attached orthographically.');if(/^ال/.test(b))notes.push('Definite article الـ is present.');return {surface:w,type:c?.type||(/^ال/.test(b)?'definite nominal/adjectival form':'unasserted content word'),en:c?.en||'',ja:c?.ja||'',root:c?.root||null,form:c?.form||null,syntax:c?.syntax||'',confidence:c?(c.confidence||'audited-high'):'not asserted',notes}}
function syntax(ar){const out=[];if(ar.includes('أَنْ '))out.push(['أَنْ + imperfect','The following imperfect is normally منصوب (subjunctive).','後続未完了形は通常 منصوب。']);if(ar.includes('لَمْ '))out.push(['لَمْ + imperfect','The following imperfect is مجزوم (jussive).','後続未完了形は مجزوم。']);if(ar.includes('لَنْ '))out.push(['لَنْ + imperfect','The following imperfect is منصوب (subjunctive).','後続未完了形は منصوب。']);if(ar.includes('لَا ')&&/لَا\s+[يتنأ]/.test(ar))out.push(['لَا','Could be ordinary negation or prohibitive لا; mood depends on function and context.','通常否定か禁止かで法が異なるため文脈確認。']);if(/كَانَ|كَانَتْ|كُنْتُ/.test(ar))out.push(['كان-family','Traditional grammar: اسم كان is nominative and خبر كان accusative.','伝統文法では اسم كان は主格、خبر كان は対格。']);if(ar.includes('لَكِنَّ'))out.push(['لَكِنَّ','An إنّ-sister; traditionally governs an accusative subject and nominative predicate.','إنّ類。伝統文法では اسم لكنّ は対格、خبر は主格。']);return out}
function discourse(ar,level){const hits=PHRASES.filter(p=>ar.includes(p[0]));const levelFocus={A2:['time, sequence, reason','時間・順序・理由'],B1:['narrative linkage, condition, decision','物語連結・条件・決定'],B2:['evidence, contrast, viewpoint','根拠・対比・観点'],C1:['framing, stance, uncertainty','枠組み・立場・不確実性'],C2:['implication, register, rhetoric','含意・レジスター・修辞']}[level]||['sentence structure','文構造'];return {hits,focus:levelFocus}}
function analyse(ar,level){return {ar,level,words:words(ar).map(info),syntax:syntax(ar),discourse:discourse(ar,level)}}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function speak(t){if(!t||!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='ar-SA';u.rate=.68;speechSynthesis.speak(u)}
const st=document.createElement('style');st.textContent=`#audDeep{display:none;position:fixed;z-index:240;inset:0;background:#f5f2ea;overflow:auto}#audDeep.show{display:block}.adIn{max-width:760px;margin:auto;padding:18px 14px 90px}.adTop{display:flex;justify-content:space-between;align-items:center;gap:10px}.adCard{background:#fffdf8;border:1px solid #ded9ce;border-radius:24px;padding:18px;margin-top:14px}.adAr{direction:rtl;text-align:center;font:36px/1.7 "Geeza Pro","Noto Naskh Arabic",serif}.adTabs{display:flex;gap:6px;overflow:auto;margin-top:12px}.adBtn{border:1px solid #d9d4ca;background:#fff;border-radius:12px;padding:9px 11px}.adBtn.on{background:#1f6f61;color:#fff}.adWord{padding:12px 0;border-top:1px solid #eee7dc}.adWord:first-child{border-top:0}.adWordAr{direction:rtl;font:26px "Geeza Pro",serif}.adSmall{font-size:12px;color:#75807c}.adWarn{background:#fff7df;border-radius:14px;padding:11px;font-size:12px;margin-top:12px}.adRow{padding:10px 0;border-bottom:1px solid #eee7dc}`;document.head.appendChild(st);
const modal=document.createElement('section');modal.id='audDeep';modal.innerHTML='<div class="adIn"><div class="adTop"><div><b>Deep Arabic · Audited Layer</b><div class="adSmall" id="adMeta"></div></div><button class="adBtn" id="adClose">×</button></div><div id="adBody"></div></div>';document.body.appendChild(modal);
let S=null,tab='architecture';
function render(){if(!S)return;const a=S;$q('#adMeta').textContent=`${a.level} · curated-first · confidence-aware`;const tabs=[['architecture','Architecture'],['words','Words'],['morph','Morphology'],['syntax','Syntax / إعراب'],['discourse','Discourse / Register']];let h=`<div class="adCard"><div class="adAr">${esc(a.ar)}</div><div style="text-align:center"><button class="adBtn" id="adSpeak">▶ Listen</button></div><div class="adTabs">${tabs.map(t=>`<button class="adBtn ${tab===t[0]?'on':''}" data-adtab="${t[0]}">${t[1]}</button>`).join('')}</div></div>`;
if(tab==='architecture'){h+=`<div class="adCard"><b>Clause architecture</b><div class="adRow">${a.discourse.hits.length?a.discourse.hits.map(x=>`${esc(x[0])} → ${esc(x[1])}`).join(' · '):'No curated multiword discourse marker detected; follow clause order, predicates and connectors.'}</div><b>Level focus</b><div>${esc(a.discourse.focus[0])}</div><div class="adSmall">${esc(a.discourse.focus[1])}</div></div>`}
if(tab==='words'){h+=`<div class="adCard">${a.words.map(w=>`<div class="adWord"><button class="adBtn adWordAr" data-adspeak="${esc(w.surface)}">${esc(w.surface)} 🔊</button><div><b>${esc(w.type)}</b></div>${w.en?`<div>${esc(w.en)}</div>`:''}${w.ja?`<div class="adSmall">${esc(w.ja)}</div>`:''}${w.syntax?`<div class="adSmall">${esc(w.syntax)}</div>`:''}</div>`).join('')}</div>`}
if(tab==='morph'){h+=`<div class="adCard">${a.words.map(w=>`<div class="adWord"><div class="adWordAr">${esc(w.surface)}</div><div>Root: <b>${esc(w.root||'not asserted')}</b></div><div>Form/Pattern: <b>${esc(w.form||'not asserted')}</b></div><div class="adSmall">Confidence: ${esc(w.confidence)}</div>${w.notes.map(n=>`<div class="adSmall">• ${esc(n)}</div>`).join('')}</div>`).join('')}<div class="adWarn">Unknown roots/forms are intentionally left unasserted. Weak roots and derived forms are not guessed.</div></div>`}
if(tab==='syntax'){h+=`<div class="adCard"><b>Government & mood</b>${a.syntax.length?a.syntax.map(x=>`<div class="adRow"><b>${esc(x[0])}</b><div>${esc(x[1])}</div><div class="adSmall">${esc(x[2])}</div></div>`).join(''):'<div class="adSmall" style="margin-top:8px">No curated high-confidence trigger detected in this sentence.</div>'}<div class="adWarn">Full إعراب is shown only where dependency can be stated safely; unresolved ellipsis or attachment is not fabricated.</div></div>`}
if(tab==='discourse'){h+=`<div class="adCard"><b>${esc(a.discourse.focus[0])}</b><div class="adSmall">${esc(a.discourse.focus[1])}</div>${a.discourse.hits.length?a.discourse.hits.map(x=>`<div class="adRow"><b>${esc(x[0])}</b><div>${esc(x[1])}: ${esc(x[3])}</div><div class="adSmall">${esc(x[2])}</div></div>`).join(''):'<div class="adSmall" style="margin-top:8px">No curated discourse phrase detected; interpret stance from clause relations and context.</div>'}</div>`}
$q('#adBody').innerHTML=h;$q('#adSpeak').onclick=()=>speak(a.ar);document.querySelectorAll('[data-adspeak]').forEach(b=>b.onclick=()=>speak(b.dataset.adspeak));document.querySelectorAll('[data-adtab]').forEach(b=>b.onclick=()=>{tab=b.dataset.adtab;render()});}
function $q(s){return document.querySelector(s)}
$q('#adClose').onclick=()=>modal.classList.remove('show');
window.ARABIC_DEEP_OPEN=function(ar,level){S=analyse(ar,level);tab='architecture';render();modal.classList.add('show')};
window.ARABIC_AUDIT_LEXICON=CURATED;
})();