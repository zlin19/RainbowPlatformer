(function(root){
'use strict';
const T=typeof module!=='undefined'?require('./engine'):root.Trail;
const definitions=[
 ['First colors','Easy','Wide landings and a safe meadow. Learn the six-color rhythm.',[[180,480,120,1],[360,480,120,2],[540,480,120,3],[720,480,120,4],[900,480,120,5],[1080,480,120,6],[1280,520,120,0]],'safe'],
 ['Up the rainbow','Easy','A gentle staircase. Keep a steady jumping rhythm.',[[180,480,120,1],[360,440,120,2],[540,400,120,3],[720,360,120,4],[900,320,120,5],[1080,280,120,6],[1280,360,120,0]],'safe'],
 ['Meadow hurdles','Easy +','Your original trail, with spikes below the stepping stones.',[[200,440,80,1],[400,360,80,2],[600,400,80,3],[800,320,80,4],[1000,360,80,5],[1200,280,80,6],[1320,400,80,0]],'meadow'],
 ['Rolling hills','Medium','Alternate high and low landings above a thorny meadow.',[[180,480,80,1],[360,400,80,2],[560,440,80,3],[760,360,80,4],[960,400,80,5],[1160,320,80,6],[1320,440,80,0]],'thorns'],
 ['Island hopping','Medium','The ground falls away. Every landing matters.',[[180,480,80,1],[360,400,80,2],[560,440,80,3],[760,360,80,4],[960,400,80,5],[1160,320,80,6],[1320,440,80,0]],'islands'],
 ['Needle peaks','Medium +','Smaller footholds, bigger climbs. Aim for the center.',[[180,440,60,1],[360,360,60,2],[560,440,60,3],[760,320,60,4],[940,400,60,5],[1140,280,60,6],[1320,400,80,0]],'islands'],
 ['The in-between','Hard','Use the plain stones to bridge the color sequence.',[[160,480,60,1],[280,400,60,0],[400,320,60,2],[520,400,60,0],[640,440,60,3],[760,360,60,0],[880,280,60,4],[1000,360,60,0],[1120,440,60,5],[1240,320,60,6],[1360,400,80,0]],'thorns'],
 ['Turn the tide','Hard','Three colors out, three colors back. Follow the trail uphill.',[[180,480,80,1],[360,480,80,2],[540,480,80,3],[740,440,80,0],[900,360,80,0],[720,280,80,4],[520,200,80,5],[320,120,80,6],[120,240,100,0]],'islands'],
 ['Thread the sky','Expert','Tiny color ledges above spikes. Control your air movement.',[[180,440,40,1],[380,360,40,2],[580,440,40,3],[780,340,40,4],[980,400,40,5],[1180,300,40,6],[1360,400,80,0]],'thorns'],
 ['Rainbow summit','Expert +','A narrow ascent, a long return, and one final leap home.',[[160,480,40,1],[280,400,40,0],[400,320,40,2],[560,400,40,0],[720,480,40,3],[880,400,40,0],[1040,320,40,4],[1200,240,40,0],[1040,160,40,5],[840,80,40,6],[640,160,40,0],[440,240,80,0]],'islands']
];
function builtins(){return definitions.map(([name,difficulty,description,route,terrain],i)=>{
 const blocks=[{x:0,y:560,w:terrain==='islands'?140:1440,h:80,n:0},...route.map(([x,y,w,n])=>({x,y,w,h:40,n}))];
 const spikes=terrain==='thorns'?[{x:160,y:520,w:1280,h:40}]:terrain==='meadow'?[{x:360,y:520,w:80,h:40},{x:680,y:520,w:80,h:40},{x:960,y:520,w:120,h:40}]:[];
 if(terrain==='meadow')for(const [x,y]of [[320,480],[520,480],[720,440],[920,440],[1120,400]])blocks.push({x,y,w:80,h:40,n:0});
 const last=route[route.length-1];return {id:'builtin-'+(i+1),name,difficulty,description,spawn:{x:60,y:520},flag:{x:Math.min(last[0]+20,T.W-40),y:last[1]-40},blocks,spikes,route:route.map(([x,y,w])=>({x:x+w/2,y}))};
 });}
// Persistence writes are atomic: callers retain their previous library if storage fails.
class LevelStore{
 constructor(storage){this.storage=storage;this.levels=[];this.completed=[];this.error='';try{const raw=JSON.parse(storage.getItem('step-by-step-library')||'null');if(raw){if(raw.version!==1||!Array.isArray(raw.levels)||!Array.isArray(raw.completed))throw Error('Invalid library');this.levels=raw.levels.filter(l=>l&&typeof l.id==='string'&&l.id.startsWith('custom-')&&typeof l.name==='string'&&!T.validate(l).length);this.completed=raw.completed.filter(id=>typeof id==='string');}}catch{this.error='Saved library could not be loaded. Export your draft before closing.';}}
 write(levels,completed){this.storage.setItem('step-by-step-library',JSON.stringify({version:1,levels,completed}));this.levels=levels;this.completed=completed;this.error='';}
 save(level,name,id){if(T.validate(level).length)throw Error(T.validate(level).join(' '));name=name.trim();if(!name||name.length>40)throw Error('Give your level a name (1–40 characters).');const exists=this.levels.some(l=>l.id===id);const copy={...T.clone(level),name,id:exists?id:'custom-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9),difficulty:'Custom',description:'Your own six-color adventure.'};delete copy.route;const levels=exists?this.levels.map(l=>l.id===id?copy:l):[...this.levels,copy];this.write(levels,this.completed.filter(key=>key!==copy.id));return T.clone(copy);}
 complete(id){if(id&&!this.completed.includes(id))this.write(this.levels,[...this.completed,id]);}
}
const api={builtins,LevelStore};if(typeof module!=='undefined')module.exports=api;else root.TrailLevels=api;
})(typeof window!=='undefined'?window:globalThis);
