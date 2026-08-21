(function(){
const F={
'a1e049':{root:'ف-ه-م',focus:'أَفْهَمُ',meaningEn:'understand',meaningJa:'理解する',noteEn:'This root is especially useful because several derived forms are common and their meanings show how Arabic builds a semantic family around one root.',noteJa:'この語根は複数の派生形が実際によく使われ、1つの語根から意味の家族がどう広がるかを見るのに適しています。',forms:[
['I','فَهِمَ','understand','理解する','basic event/state'],
['II','فَهَّمَ','make someone understand; explain clearly','理解させる・よく説明する','causative/intensive'],
['IV','أَفْهَمَ','make understand; inform','理解させる・知らせる','causative'],
['V','تَفَهَّمَ','understand/appreciate a situation','事情を理解する','reflexive/internalized relation to II'],
['X','اِسْتَفْهَمَ','ask for clarification; inquire','説明を求める・問い合わせる','seek/request the root meaning']
],bridge:[['فَهِمَ','he understood'],['فَهَّمْتُهُ','I made him understand / explained it to him'],['أَفْهَمْتُهُ','I made him understand'],['تَفَهَّمَ الْمَوْقِفَ','he understood/appreciated the situation'],['اِسْتَفْهَمَ عَنِ الْمَعْنَى','he asked about the meaning']]},
'a1e042':{root:'ن-ظ-ر',focus:'اِنْتَظِرْ',meaningEn:'wait',meaningJa:'待つ',noteEn:'The Form VIII verb اِنْتَظَرَ is historically connected to the root ن-ظ-ر, whose core family concerns looking/considering. The derived verb has lexicalized as “wait.” Do not assume every derived-form meaning can be predicted mechanically.',noteJa:'第VIII形 اِنْتَظَرَ は「見る・考察する」に関係する ن-ظ-ر 語根とつながりますが、派生語は「待つ」として語彙化しています。派生形の意味は機械的に予測できるとは限りません。',forms:[
['I','نَظَرَ','look; consider','見る・考察する','basic root meaning'],
['III','نَاظَرَ','debate/discuss with','議論する','reciprocal/interactive tendency'],
['VIII','اِنْتَظَرَ','wait','待つ','lexicalized derived meaning']
],bridge:[['نَظَرَ إِلَى الْبَابِ','he looked at the door'],['اِنْتَظَرَ عِنْدَ الْبَابِ','he waited by the door'],['اِنْتَظِرْ قَلِيلًا','wait a little']]},
'a1e025':{root:'ج-ر-ب',focus:'أُجَرِّبَهُ',meaningEn:'try/test',meaningJa:'試す',noteEn:'The lesson verb جَرَّبَ is Form II. Here the doubled middle radical is not decoration: it is part of the derived stem pattern. The root also appears in nouns such as تَجْرِبَة “experience/experiment.”',noteJa:'教材中の جَرَّبَ は第II形です。中央語根文字の重なりは飾りではなく、派生語幹のパターンそのものです。同じ語根は تَجْرِبَة「経験・実験」などにも現れます。',forms:[
['II','جَرَّبَ','try; test','試す・試験する','derived verbal stem'],
['Noun','تَجْرِبَة','experience; experiment','経験・実験','verbal-noun family'],
['Plural noun','تَجَارِب','experiences; experiments','経験・実験（複数）','broken plural']
],bridge:[['جَرَّبْتُهُ','I tried it'],['أُرِيدُ أَنْ أُجَرِّبَهُ','I want to try it'],['هَذِهِ تَجْرِبَةٌ جَدِيدَةٌ','This is a new experience']]},
'a1e011':{root:'ر-و-د',focus:'أُرِيدُ',meaningEn:'want',meaningJa:'欲する',noteEn:'أَرَادَ is a weak-root Form IV verb. Its surface shape is far from a simple consonant template, so this is a good example of why Arabic morphology needs both root recognition and knowledge of weak-verb changes.',noteJa:'أَرَادَ は弱根を持つ第IV形です。表面形が単純な子音テンプレートから大きく変わるため、語根認識と弱変化の両方が必要だと分かる例です。',forms:[
['IV','أَرَادَ','want; intend','欲する・意図する','common lexical verb'],
['Maṣdar','إِرَادَة','will; intention','意志・意図','verbal noun'],
['Active participle','مُرِيد','one who wants/seeks','望む者','derived participle'],
['Passive participle','مُرَاد','intended; desired','意図された・望まれた','derived participle']
],bridge:[['أُرِيدُ مَاءً','I want water'],['لَدَيَّ إِرَادَةٌ قَوِيَّةٌ','I have strong will'],['هَذَا هُوَ الْمُرَادُ','This is what is intended']]}
};
const ATLAS=[
['I','فَعَلَ','base lexical meaning','基本語彙意味'],
['II','فَعَّلَ','often causative/intensive','使役・強意の傾向'],
['III','فَاعَلَ','often interaction/participation','相互・関与の傾向'],
['IV','أَفْعَلَ','often causative/resultative','使役・結果化の傾向'],
['V','تَفَعَّلَ','often reflexive/internal counterpart of II','II形に対応する内向き・再帰的傾向'],
['VI','تَفَاعَلَ','often reciprocal counterpart of III','III形に対応する相互的傾向'],
['VII','اِنْفَعَلَ','often inchoative/passive-like change','自発・状態変化の傾向'],
['VIII','اِفْتَعَلَ','varied; often internally directed/lexicalized','多様・内向き／語彙化'],
['IX','اِفْعَلَّ','mostly colors/physical states','色・身体状態が中心'],
['X','اِسْتَفْعَلَ','often seek/request/consider as','求める・〜とみなす傾向']
];
function x(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
const st=document.createElement('style');st.textContent='.vfHero{background:#f7f5ef;border-radius:18px;padding:15px}.vfRoot{font:31px/1.4 "Geeza Pro","Noto Naskh Arabic",serif;direction:rtl}.vfGrid{display:grid;gap:8px;margin-top:12px}.vfCard{border:1px solid #e7e0d5;border-radius:15px;padding:11px;background:#fff}.vfForm{font-size:11px;color:#74807c}.vfAr{font:25px/1.45 "Geeza Pro","Noto Naskh Arabic",serif;direction:rtl;text-align:right}.vfBridge{border-top:1px solid #eee7dc;padding:10px 0}.vfAtlas{display:grid;gap:6px}.vfAtlasRow{display:grid;grid-template-columns:44px minmax(80px,110px) 1fr;gap:8px;align-items:start;border-bottom:1px solid #eee7dc;padding:8px 0}.vfPattern{font:19px/1.4 "Geeza Pro","Noto Naskh Arabic",serif;direction:rtl}.vfWarn{margin-top:12px;padding:11px;border-left:3px solid #1f6f61;background:#f6faf8;border-radius:0 14px 14px 0}';document.head.appendChild(st);
const tabs=document.querySelector('.layerTabs');if(tabs&&!tabs.querySelector('[data-layer="verbfamily"]')){const t=document.createElement('button');t.className='tab';t.dataset.layer='verbfamily';t.textContent='Verb Family';tabs.appendChild(t);t.onclick=()=>{layer='verbfamily';renderAnalysis()}}
function renderVF(e,b){const f=F[e.id];if(!f){b.innerHTML='<div class="empty">Verb Family Map appears when this Experience contains a mapped verb.<br><span class="micro">対応する動詞があるExperienceで表示されます。</span></div>';return}b.innerHTML=`<div class="vfHero"><div class="micro">ROOT / الجذر</div><div class="vfRoot">${x(f.root)}</div><div><b>${x(f.focus)}</b> · ${x(f.meaningEn)}</div><div class="secondary">${x(f.meaningJa)}</div><p>${x(f.noteEn)}</p><div class="secondary">${x(f.noteJa)}</div></div><h4>This root family</h4><div class="vfGrid">${f.forms.map(r=>`<div class="vfCard"><div class="vfForm">${x(r[0])}</div><div class="vfAr">${x(r[1])}</div><b>${x(r[2])}</b><div class="secondary">${x(r[3])}</div><div class="micro">${x(r[4])}</div></div>`).join('')}</div><h4>Meaning in motion</h4>${f.bridge.map(r=>`<div class="vfBridge"><div class="vfAr">${x(r[0])}</div><div>${x(r[1])}</div></div>`).join('')}<details class="deep"><summary>Form I–X pattern atlas</summary><div class="vfWarn"><b>Important:</b> Form numbers are patterns, not guaranteed meanings. Not every root has every form, and lexical meaning can drift.<div class="secondary">重要：Form番号は意味そのものではなく「型」です。すべての語根にI〜Xが揃うわけではなく、実際の意味は語彙化によって変化します。</div></div><div class="vfAtlas">${ATLAS.map(r=>`<div class="vfAtlasRow"><b>${x(r[0])}</b><div class="vfPattern">${x(r[1])}</div><div>${x(r[2])}<div class="secondary">${x(r[3])}</div></div></div>`).join('')}</div></details>`}
const old=window.renderAnalysis||renderAnalysis;window.renderAnalysis=renderAnalysis=function(){const e=D[i],b=$('#analysisBody');document.querySelectorAll('.tab').forEach(q=>q.classList.toggle('active',q.dataset.layer===layer));if(layer==='verbfamily'){renderVF(e,b);return}old()};
})();