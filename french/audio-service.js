(function(){
'use strict';
const KEY='fsl.audio.voice.v1';
function voices(){try{return (speechSynthesis.getVoices()||[]).filter(v=>/^fr(-|$)/i.test(v.lang||'')||/french|français/i.test(v.name||''))}catch{return[]}}
function id(v){return `${v.name}|||${v.lang}|||${v.voiceURI||''}`}
function selected(){try{return localStorage.getItem(KEY)||''}catch{return''}}
function choose(){const list=voices(),saved=selected();return list.find(v=>id(v)===saved)||list.find(v=>/^fr-FR$/i.test(v.lang||''))||list[0]||null}
function setVoice(value){try{value?localStorage.setItem(KEY,value):localStorage.removeItem(KEY)}catch{}return choose()}
function speak(text,{rate=.82,voice=null}={}){if(!text||!('speechSynthesis'in window))return false;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(text));const v=voice||choose();if(v){u.voice=v;u.lang=v.lang||'fr-FR'}else u.lang='fr-FR';u.rate=rate;u.pitch=1;speechSynthesis.speak(u);return true}catch{return false}}
window.FSLAudio={voices,voiceId:id,chooseVoice:choose,setVoice,speakSentence:(t)=>speak(t,{rate:.84}),speakSlow:(t)=>speak(t,{rate:.65}),speakWord:(t)=>speak(t,{rate:.72}),stop:()=>{try{speechSynthesis.cancel()}catch{}}};
})();
