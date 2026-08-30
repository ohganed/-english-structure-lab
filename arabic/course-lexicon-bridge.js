(function(){
const base=window.ARABIC_WORD_DEPTH;
const course=window.ARABIC_COURSE_LEXICON;
if(!base||!course)return;
const lookup0=base.lookup.bind(base),six0=base.six.bind(base),detail0=base.detail.bind(base);
function lookup(surface){
  const a=lookup0(surface);
  if(a&&a.pos!=='Unknown'&&a.en&&a.en!=='Meaning not yet audited')return a;
  const c=course.lookup(surface);
  return c?{...a,...c,surface}:a;
}
function regularRows(baseWord){
  const b=String(baseWord||'').trim(),d='ال'+b;
  const acc=/[ةىا]$/.test(b)?b+'ً':b+'ًا';
  return [
    {caseEn:'Nominative',indef:b+'ٌ',def:d+'ُ',irab:'مرفوع'},
    {caseEn:'Accusative',indef:acc,def:d+'َ',irab:'منصوب'},
    {caseEn:'Genitive',indef:b+'ٍ',def:d+'ِ',irab:'مجرور'}
  ];
}
function six(surface){
  const s=six0(surface);if(s)return s;
  const c=course.lookup(surface);if(!c||!['Noun','Adjective'].includes(c.pos))return null;
  return {special:false,rows:regularRows(c.lemma||surface),note:'Course curated lemma; three standard Arabic Cases.'};
}
function detail(surface){
  const d=detail0(surface)||{},c=course.lookup(surface);
  if(!c)return d;
  return {...d,lemma:c.lemma||d.lemma,pos:c.pos||d.pos,root:c.root||d.root||null,pattern:c.form||d.pattern||null,confidence:c.confidence||d.confidence};
}
window.ARABIC_WORD_DEPTH={...base,lookup,six,detail};
window.ARABIC_COURSE_LEXICON_BRIDGE=true;
})();
