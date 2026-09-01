(function(){
'use strict';
const KEY='fsl_profile_v1';
const defaults=()=>({schemaVersion:1,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),preferences:{showEnglish:true,showJapanese:true},progress:{currentId:'A1-W01-001'},learning:{sentences:{},sessions:[],events:[]},aliases:{},extensions:{}});
function load(){try{const raw=localStorage.getItem(KEY);if(!raw)return defaults();const p=JSON.parse(raw);return {...defaults(),...p,preferences:{...defaults().preferences,...(p.preferences||{})},progress:{...defaults().progress,...(p.progress||{})},learning:{...defaults().learning,...(p.learning||{})}}}catch{return defaults()}}
function save(profile){const p={...profile,updatedAt:new Date().toISOString()};localStorage.setItem(KEY,JSON.stringify(p));return p}
function setCurrent(id){const p=load();p.progress.currentId=id;p.learning.sentences[id]={...(p.learning.sentences[id]||{}),lastSeenAt:new Date().toISOString(),encounters:Number(p.learning.sentences[id]?.encounters||0)+1};p.learning.events.push({type:'sentence-view',sentenceId:id,at:new Date().toISOString()});return save(p)}
function setPreference(name,value){const p=load();p.preferences[name]=value;return save(p)}
window.FSLStorage={key:KEY,load,save,setCurrent,setPreference,exportData:()=>JSON.stringify(load(),null,2)};
})();
