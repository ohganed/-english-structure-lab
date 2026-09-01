(function(){
'use strict';
const VERSION='0.1.0';
function normalize(item){
  if(!item||typeof item!=='object'||!item.id||!item.fr)return null;
  return {
    id:item.id,level:item.level||'UNCLASSIFIED',world:item.world||null,scene:item.scene||null,situation:item.situation||'',
    fr:item.fr,en:item.en||'',ja:item.ja||'',chunks:Array.isArray(item.chunks)?item.chunks:[],words:Array.isArray(item.words)?item.words:[],
    architecture:Array.isArray(item.architecture)?item.architecture:[],sound:item.sound||null,spokenFrench:item.spokenFrench||null,
    socialMeaning:item.socialMeaning||null,reencounterTargets:Array.isArray(item.reencounterTargets)?item.reencounterTargets:[],
    reencounterFrom:Array.isArray(item.reencounterFrom)?item.reencounterFrom:[],register:item.register||null,verification:item.verification||'NOT VERIFIED'
  };
}
function all(){return (Array.isArray(window.FSL_A1_CALIBRATION)?window.FSL_A1_CALIBRATION:[]).map(normalize).filter(Boolean)}
function byId(id){return all().find(x=>x.id===id)||null}
function byLevel(level){return all().filter(x=>x.level===level)}
window.FSLMaterialEngine={version:VERSION,normalize,getAll:all,getById:byId,getByLevel:byLevel,stats:()=>({version:VERSION,total:all().length})};
})();
