(function(){
const L=window.ARABIC_AUDIT_LEXICON;if(!L)return;
const set=(forms,root,form,en,ja)=>forms.forEach(s=>L[s]={...(L[s]||{}),type:'verb',root,form,en,ja,confidence:'audited-high'});
// Corrections verified after the pack-2 review.
set(['أَضَافَ','يُضِيفُ'],'ض ي ف','Form IV, weak','add','加える');
set(['أَكَّدَ','يُؤَكِّدُ'],'أ ك د','Form II, hamzated','confirm / emphasize','確認する／強調する');
set(['اِسْتَمَعَ','يَسْتَمِعُ'],'س م ع','Form X','listen','聴く');
window.ARABIC_AUDIT_FIXES={version:'2.0.1',corrected:['أَضَافَ','أَكَّدَ','اِسْتَمَعَ']};
})();