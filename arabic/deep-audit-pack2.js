(function(){
const L=window.ARABIC_AUDIT_LEXICON;if(!L)return;
const add=(s,o)=>{if(!L[s])L[s]=o};
const fam=(root,form,en,ja,forms)=>forms.forEach(s=>add(s,{type:'verb',en,ja,root,form,confidence:'audited-high'}));
// Curated high-frequency verb families. Surface forms are explicit; roots/forms are not guessed.
fam('ك ت ب','Form I','write','書く',['كَتَبَ','يَكْتُبُ','كَتَبْتُ','نَكْتُبُ']);
fam('ق ر أ','Form I','read','読む',['قَرَأَ','يَقْرَأُ','قَرَأْتُ','نَقْرَأُ']);
fam('د ر س','Form I','study','勉強する',['دَرَسَ','يَدْرُسُ','دَرَسْتُ','نَدْرُسُ']);
fam('ع م ل','Form I','work','働く',['عَمِلَ','يَعْمَلُ','عَمِلْتُ','نَعْمَلُ']);
fam('ع ر ف','Form I','know','知る',['عَرَفَ','يَعْرِفُ','عَرَفْتُ','نَعْرِفُ']);
fam('س م ع','Form I','hear','聞く',['سَمِعَ','يَسْمَعُ','سَمِعْتُ','نَسْمَعُ']);
fam('أ خ ذ','Form I, hamzated','take','取る',['أَخَذَ','يَأْخُذُ','أَخَذْتُ','نَأْخُذُ','نَأْخُذْ']);
fam('و ج د','Form I, assimilated','find','見つける',['وَجَدَ','يَجِدُ','وَجَدْتُ','نَجِدُ','نَجِدْ']);
fam('ف ت ح','Form I','open','開ける',['فَتَحَ','يَفْتَحُ','فَتَحْتُ']);
fam('د خ ل','Form I','enter','入る',['دَخَلَ','يَدْخُلُ','دَخَلْتُ']);
fam('خ ر ج','Form I','go out','出る',['خَرَجَ','يَخْرُجُ','خَرَجْتُ']);
fam('ج ل س','Form I','sit','座る',['جَلَسَ','يَجْلِسُ','جَلَسْتُ']);
fam('ش ر ب','Form I','drink','飲む',['شَرِبَ','يَشْرَبُ','شَرِبْتُ']);
fam('أ ك ل','Form I, hamzated','eat','食べる',['أَكَلَ','يَأْكُلُ','أَكَلْتُ']);
fam('ن و م','Form I, hollow','sleep','眠る',['نَامَ','يَنَامُ','نِمْتُ']);
fam('ق و م','Form I, hollow','stand / do','立つ／行う',['قَامَ','يَقُومُ','قُمْتُ']);
fam('ج ي ء','Form I, weak','come','来る',['جَاءَ','يَجِيءُ','جِئْتُ']);
fam('ر أ ي','Form I, irregular weak','see / consider','見る／考える',['رَأَى','يَرَى','رَأَيْتُ']);
fam('ب د أ','Form I, hamzated','begin','始める',['بَدَأَ','يَبْدَأُ','بَدَأْتُ']);
fam('ب ق ي','Form I, defective','remain','残る',['بَقِيَ','يَبْقَى','بَقِيتُ']);
fam('م ش ي','Form I, defective','walk','歩く',['مَشَى','يَمْشِي','مَشَيْتُ']);
fam('ع ي ش','Form I, hollow','live','生きる',['عَاشَ','يَعِيشُ','عِشْتُ']);
fam('م و ت','Form I, hollow','die','死ぬ',['مَاتَ','يَمُوتُ']);
fam('ح م ل','Form I','carry','運ぶ',['حَمَلَ','يَحْمِلُ','حَمَلْتُ']);
fam('ت ر ك','Form I','leave','離れる／残す',['تَرَكَ','يَتْرُكُ','تَرَكْتُ']);
fam('ط ل ب','Form I','request / seek','求める',['طَلَبَ','يَطْلُبُ','طَلَبْتُ']);
fam('د ف ع','Form I','pay / push','支払う／押す',['دَفَعَ','يَدْفَعُ','دَفَعْتُ']);
fam('ل ب س','Form I','wear','着る',['لَبِسَ','يَلْبَسُ','لَبِسْتُ']);
fam('س ك ن','Form I','live / reside','住む',['سَكَنَ','يَسْكُنُ','سَكَنْتُ']);
fam('ل ع ب','Form I','play','遊ぶ',['لَعِبَ','يَلْعَبُ','لَعِبْتُ']);
fam('ف ت ح','Form I','open','開く',['اِفْتَحْ']);
fam('غ ل ق','Form IV','close','閉じる',['أَغْلَقَ','يُغْلِقُ','أَغْلَقْتُ']);
fam('ش ر ح','Form I','explain','説明する',['شَرَحَ','يَشْرَحُ','شَرَحْتُ']);
fam('ح ص ل','Form I','obtain / happen','得る／起こる',['حَصَلَ','يَحْصُلُ']);
fam('ح د ث','Form I','happen','起こる',['حَدَثَ','يَحْدُثُ']);
fam('ب ح ث','Form I','search / research','調べる',['بَحَثَ','يَبْحَثُ']);
fam('ظ ه ر','Form I','appear','現れる',['ظَهَرَ','يَظْهَرُ']);
fam('ن ج ح','Form I','succeed','成功する',['نَجَحَ','يَنْجَحُ']);
fam('ف ش ل','Form I','fail','失敗する',['فَشِلَ','يَفْشَلُ']);
fam('ح ف ظ','Form I','memorize / preserve','覚える／保つ',['حَفِظَ','يَحْفَظُ']);
fam('ن س ي','Form I, defective','forget','忘れる',['نَسِيَ','يَنْسَى','نَسِيتُ']);
fam('ل ق ي','Form I, defective','meet','会う',['لَقِيَ','يَلْقَى']);
// Form II
fam('ع ل م','Form II','teach','教える',['عَلَّمَ','يُعَلِّمُ','عَلَّمْتُ']);
fam('ف ك ر','Form II','think','考える',['فَكَّرَ','يُفَكِّرُ','فَكَّرْتُ']);
fam('ق ر ر','Form II','decide','決める',['قَرَّرَ','يُقَرِّرُ','قَرَّرْتُ']);
fam('ط و ر','Form II','develop','発展させる',['طَوَّرَ','يُطَوِّرُ']);
fam('غ ي ر','Form II','change','変える',['غَيَّرَ','يُغَيِّرُ','غَيَّرْتُ']);
fam('ح ض ر','Form II','prepare','準備する',['حَضَّرَ','يُحَضِّرُ']);
fam('ج ر ب','Form II','try / test','試す',['جَرَّبَ','يُجَرِّبُ','أُجَرِّبُ','أُجَرِّبَهُ']);
fam('ر ت ب','Form II','arrange','整える',['رَتَّبَ','يُرَتِّبُ']);
fam('ق د م','Form II','present / provide','提示する／提供する',['قَدَّمَ','يُقَدِّمُ']);
fam('ف س ر','Form II','explain / interpret','解釈する',['فَسَّرَ','يُفَسِّرُ']);
fam('ح د د','Form II','determine / define','定める',['حَدَّدَ','يُحَدِّدُ']);
fam('و ض ح','Form II','clarify','明確にする',['وَضَّحَ','يُوَضِّحُ']);
// Form III
fam('س ع د','Form III','help','助ける',['سَاعَدَ','يُسَاعِدُ','سَاعَدَنِي']);
fam('ش ر ك','Form III','participate / share','参加する',['شَارَكَ','يُشَارِكُ']);
fam('ق ب ل','Form III','meet / interview','会う／面談する',['قَابَلَ','يُقَابِلُ']);
fam('ن ق ش','Form III','discuss','議論する',['نَاقَشَ','يُنَاقِشُ']);
fam('ح و ل','Form III','try','試みる',['حَاوَلَ','يُحَاوِلُ']);
fam('ت ب ع','Form III','follow / continue','追う／続ける',['تَابَعَ','يُتَابِعُ']);
// Form IV
fam('ر س ل','Form IV','send','送る',['أَرْسَلَ','يُرْسِلُ','أَرْسَلْتُ']);
fam('ع ل ن','Form IV','announce','発表する',['أَعْلَنَ','يُعْلِنُ']);
fam('ظ ه ر','Form IV','show / demonstrate','示す',['أَظْهَرَ','يُظْهِرُ']);
fam('د خ ل','Form IV','insert / admit','入れる',['أَدْخَلَ','يُدْخِلُ']);
fam('خ ر ج','Form IV','remove / bring out','出す',['أَخْرَجَ','يُخْرِجُ']);
fam('ع و د','Form IV, weak','return / restore','戻す',['أَعَادَ','يُعِيدُ']);
fam('ز ي د','Form IV, weak','add','加える',['أَضَافَ','يُضِيفُ']);
fam('ك د د','Form II/lexical أكّد','confirm','確認する',['أَكَّدَ','يُؤَكِّدُ']);
fam('و ق ف','Form IV','stop','止める',['أَوْقَفَ','يُوقِفُ']);
fam('ق و م','Form IV, weak','establish / hold','設立する／行う',['أَقَامَ','يُقِيمُ']);
fam('ج و ب','Form IV, weak','answer','答える',['أَجَابَ','يُجِيبُ']);
fam('ح ب ب','Form IV, geminate','love / like','好む',['أَحَبَّ','يُحِبُّ','أُحِبُّ']);
fam('ر و د','Form IV, weak','want','望む',['أَرَادَ','يُرِيدُ','أُرِيدُ']);
fam('ش و ر','Form IV, weak','indicate','示す',['أَشَارَ','يُشِيرُ','تُشِيرُ']);
// Form V
fam('ع ل م','Form V','learn','学ぶ',['تَعَلَّمَ','يَتَعَلَّمُ','تَعَلَّمْتُ']);
fam('ح د ث','Form V','speak / converse','話す',['تَحَدَّثَ','يَتَحَدَّثُ','تَحَدَّثْتُ']);
fam('غ ي ر','Form V','change (intransitive)','変わる',['تَغَيَّرَ','يَتَغَيَّرُ']);
fam('ط و ر','Form V','develop / evolve','発展する',['تَطَوَّرَ','يَتَطَوَّرُ']);
fam('ذ ك ر','Form V','remember','思い出す',['تَذَكَّرَ','يَتَذَكَّرُ']);
fam('و ق ع','Form V','expect','予想する',['تَوَقَّعَ','يَتَوَقَّعُ']);
fam('أ خ ر','Form V','be late','遅れる',['تَأَخَّرَ','يَتَأَخَّرُ','تَأَخَّرْتُ']);
fam('ق د م','Form V','advance / progress','進む',['تَقَدَّمَ','يَتَقَدَّمُ']);
fam('ح س ن','Form V','improve','改善する',['تَحَسَّنَ','يَتَحَسَّنُ']);
fam('أ ث ر','Form V','be affected','影響を受ける',['تَأَثَّرَ','يَتَأَثَّرُ']);
// Form VI
fam('ع و ن','Form VI','cooperate','協力する',['تَعَاوَنَ','يَتَعَاوَنُ']);
fam('ن ق ش','Form VI','discuss mutually','話し合う',['تَنَاقَشَ','يَتَنَاقَشُ']);
fam('و ص ل','Form VI','communicate / stay in contact','連絡する',['تَوَاصَلَ','يَتَوَاصَلُ']);
fam('ب د ل','Form VI','exchange','交換する',['تَبَادَلَ','يَتَبَادَلُ']);
fam('ن ف س','Form VI','compete','競争する',['تَنَافَسَ','يَتَنَافَسُ']);
fam('ف ه م','Form VI','reach mutual understanding','相互理解する',['تَفَاهَمَ','يَتَفَاهَمُ']);
// Form VII
fam('ف ت ح','Form VII','open (intransitive)','開く',['اِنْفَتَحَ','يَنْفَتِحُ']);
fam('ك س ر','Form VII','break (intransitive)','壊れる',['اِنْكَسَرَ','يَنْكَسِرُ']);
fam('ط ل ق','Form VII','set off / launch','出発する',['اِنْطَلَقَ','يَنْطَلِقُ']);
fam('ع ط ف','Form VII','turn / bend','曲がる',['اِنْعَطَفَ','يَنْعَطِفُ','اِنْعَطِفْ']);
fam('خ ف ض','Form VII','decrease','低下する',['اِنْخَفَضَ','يَنْخَفِضُ']);
// Form VIII
fam('ن ظ ر','Form VIII','wait','待つ',['اِنْتَظَرَ','يَنْتَظِرُ','اِنْتَظِرْ','نَنْتَظِرَ']);
fam('خ ي ر','Form VIII, weak','choose','選ぶ',['اِخْتَارَ','يَخْتَارُ','اِخْتَرْتُ']);
fam('ج م ع','Form VIII','meet / gather','集まる',['اِجْتَمَعَ','يَجْتَمِعُ']);
fam('ه م م','Form VIII, geminate','care / be interested','関心を持つ',['اِهْتَمَّ','يَهْتَمُّ']);
fam('ق ر ب','Form VIII','approach','近づく',['اِقْتَرَبَ','يَقْتَرِبُ']);
fam('ع م د','Form VIII','depend / rely','依拠する',['اِعْتَمَدَ','يَعْتَمِدُ']);
fam('ع ق د','Form VIII','believe','考える／信じる',['اِعْتَقَدَ','يَعْتَقِدُ']);
fam('و ف ق','Form VIII, assimilated','agree','合意する',['اِتَّفَقَ','يَتَّفِقُ']);
fam('خ ل ف','Form VIII','differ / disagree','異なる',['اِخْتَلَفَ','يَخْتَلِفُ']);
fam('ك ش ف','Form VIII','discover','発見する',['اِكْتَشَفَ','يَكْتَشِفُ']);
fam('ر ف ع','Form VIII','rise','上昇する',['اِرْتَفَعَ','يَرْتَفِعُ']);
fam('ح و ج','Form VIII, weak','need','必要とする',['اِحْتَاجَ','يَحْتَاجُ']);
// Form IX (mainly colors/states)
fam('ح م ر','Form IX','become red','赤くなる',['اِحْمَرَّ','يَحْمَرُّ']);
fam('خ ض ر','Form IX','become green','緑になる',['اِخْضَرَّ','يَخْضَرُّ']);
fam('س و د','Form IX','become black','黒くなる',['اِسْوَدَّ','يَسْوَدُّ']);
fam('ب ي ض','Form IX','become white','白くなる',['اِبْيَضَّ','يَبْيَضُّ']);
// Form X
fam('خ د م','Form X','use','使う',['اِسْتَخْدَمَ','يَسْتَخْدِمُ']);
fam('ط و ع','Form X, weak','be able','できる',['اِسْتَطَاعَ','يَسْتَطِيعُ','أَسْتَطِيعُ']);
fam('م ر ر','Form X','continue','続ける',['اِسْتَمَرَّ','يَسْتَمِرُّ']);
fam('ق ب ل','Form X','receive / welcome','受け取る／迎える',['اِسْتَقْبَلَ','يَسْتَقْبِلُ']);
fam('م ع ع','Form X lexicalized','listen','聴く',['اِسْتَمَعَ','يَسْتَمِعُ']);
fam('غ ر ق','Form X','take / consume time','時間がかかる',['اِسْتَغْرَقَ','يَسْتَغْرِقُ']);
fam('ف ي د','Form X, weak','benefit','利益を得る',['اِسْتَفَادَ','يَسْتَفِيدُ']);
fam('ن د د','Form X','base / rely on','根拠とする',['اِسْتَنَدَ','يَسْتَنِدُ']);
fam('ن ت ج','Form X','infer / conclude','推論する',['اِسْتَنْتَجَ','يَسْتَنْتِجُ']);
fam('ب ع د','Form X','exclude / rule out','除外する',['اِسْتَبْعَدَ','يَسْتَبْعِدُ']);
fam('ك ش ف','Form X','explore','探索する',['اِسْتَكْشَفَ','يَسْتَكْشِفُ']);
fam('ج و ب','Form X, weak','respond','応答する',['اِسْتَجَابَ','يَسْتَجِيبُ']);
fam('ق ر ر','Form X, geminate','settle / stabilize','安定する',['اِسْتَقَرَّ','يَسْتَقِرُّ']);

const PREPS={
'مِنْ':['from','〜から','governs a following nominal in the genitive (مجرور)'],
'إِلَى':['to / toward','〜へ','governs genitive'], 'عَنْ':['about / away from','〜について／〜から離れて','governs genitive'],
'عَلَى':['on / upon','〜の上に','governs genitive'], 'فِي':['in','〜の中に','governs genitive'],
'بِ':['with / by','〜で／〜によって','attached preposition; governs genitive'], 'لِ':['for / to','〜のために','attached preposition; governs genitive'],
'كَـ':['like / as','〜のように','attached preposition; governs genitive'], 'مَعَ':['with','〜と','commonly followed by genitive nominal'],
'بَيْنَ':['between','〜の間に','adverbial relational noun, normally in iḍāfa with genitive complement'],
'عِنْدَ':['at / with','〜のところに','adverbial relational noun, normally in iḍāfa'],
'بَعْدَ':['after','〜の後に','relational noun; following nominal is genitive in iḍāfa'],
'قَبْلَ':['before','〜の前に','relational noun; following nominal is genitive in iḍāfa'],
'خِلَالَ':['during','〜の間に','relational noun; genitive complement'], 'دُونَ':['without / below','〜なしで','often governs a genitive complement'],
'نَحْوَ':['toward / about','〜の方へ／約','relational/adverbial use; often genitive complement'],
'مُنْذُ':['since','〜以来','preposition/temporal particle depending on construction'],
'أَمَامَ':['in front of','〜の前に','relational noun; genitive complement'], 'خَلْفَ':['behind','〜の後ろに','relational noun; genitive complement'],
'فَوْقَ':['above','〜の上方に','relational noun; genitive complement'], 'تَحْتَ':['under','〜の下に','relational noun; genitive complement']
};
Object.entries(PREPS).forEach(([s,x])=>add(s,{type:'preposition / relational',en:x[0],ja:x[1],syntax:x[2],confidence:'audited-high'}));
const INNA={
'إِنَّ':['indeed / that','確かに／〜ということ'], 'أَنَّ':['that','〜ということ'], 'كَأَنَّ':['as if','まるで〜のように'],
'لَكِنَّ':['but / however','しかし'], 'لَيْتَ':['if only / I wish','〜ならよいのに'], 'لَعَلَّ':['perhaps / hopefully','おそらく／〜であればよい']
};
Object.entries(INNA).forEach(([s,x])=>add(s,{type:'إنّ-family particle',en:x[0],ja:x[1],syntax:'Traditional analysis: اسم particle is accusative (منصوب), while its predicate خبر is nominative (مرفوع).',confidence:'audited-high'}));
const KANA={
'كَانَ':['was','〜だった'],'كَانَتْ':['was (f.)','〜だった'],'كُنْتُ':['I was','私は〜だった'],'أَصْبَحَ':['became','〜になった'],
'أَمْسَى':['became / was in evening context','夕方に〜となった'],'أَضْحَى':['became','〜となった'],'ظَلَّ':['remained / kept','〜し続けた'],
'بَاتَ':['spent the night / became','夜を過ごした／〜となった'],'صَارَ':['became','〜になった'],'لَيْسَ':['is not','〜ではない']
};
Object.entries(KANA).forEach(([s,x])=>add(s,{type:'كان-family copular verb',en:x[0],ja:x[1],syntax:'Traditional analysis: اسم كان is nominative (مرفوع), while خبر كان is accusative (منصوب).',confidence:'audited-high'}));

// Add a visible cause → form → role audit card whenever the audited modal opens.
const oldOpen=window.ARABIC_DEEP_OPEN;
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function grammarHits(ar){const h=[];
 for(const p of Object.keys(INNA))if(ar.includes(p))h.push([p,'إنّ-family','اسم → منصوب','خبر → مرفوع']);
 for(const p of Object.keys(KANA))if(ar.includes(p))h.push([p,'كان-family','اسم → مرفوع','خبر → منصوب']);
 for(const [p,x] of Object.entries(PREPS))if(ar.includes(p+' ')||ar.startsWith(p+' '))h.push([p,'government',x[2],'following nominal / complement']);
 if(ar.includes('أَنْ '))h.push(['أَنْ','mood government','imperfect → منصوب','verbal complement']);
 if(ar.includes('لَمْ '))h.push(['لَمْ','mood government','imperfect → مجزوم','past negation']);
 if(ar.includes('لَنْ '))h.push(['لَنْ','mood government','imperfect → منصوب','future negation']);
 return h;
}
window.ARABIC_DEEP_OPEN=function(ar,level){if(typeof oldOpen==='function')oldOpen(ar,level);setTimeout(()=>{
 const body=document.querySelector('#adBody');if(!body)return;body.querySelector('.auditPack2')?.remove();const hits=grammarHits(ar);if(!hits.length)return;
 const card=document.createElement('div');card.className='adCard auditPack2';card.innerHTML='<b>Curated Grammar Audit · Cause → Form → Role</b><div class="adSmall">監修ルールで検出した支配関係</div>'+hits.map(x=>`<div class="adRow"><b>${esc(x[0])}</b><div>${esc(x[1])} → ${esc(x[2])}</div><div class="adSmall">${esc(x[3])}</div></div>`).join('');
 body.prepend(card);
 },0)};
window.ARABIC_AUDIT_PACK2={surfaceEntries:Object.keys(L).length,prepositions:Object.keys(PREPS).length,innaFamily:Object.keys(INNA).length,kanaFamily:Object.keys(KANA).length};
})();