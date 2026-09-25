(function(root){
'use strict';
const W=1440,H=640,G=40;
// Keep n as the stable sequence ID so existing saved/exported levels remain compatible.
const COLORS=Object.freeze([
  {name:'Red',fill:'#db454b',edge:'#9f2935',shine:'#ff9397',ink:'#ffffff'},
  {name:'Orange',fill:'#ef923d',edge:'#ae5d21',shine:'#ffd0a1',ink:'#492507'},
  {name:'Yellow',fill:'#f3d44e',edge:'#ab8a21',shine:'#fff1a1',ink:'#493b0b'},
  {name:'Green',fill:'#38965a',edge:'#22653b',shine:'#85d69c',ink:'#ffffff'},
  {name:'Blue',fill:'#347dcc',edge:'#20558f',shine:'#91c7ff',ink:'#ffffff'},
  {name:'Purple',fill:'#9654c4',edge:'#633387',shine:'#d2a0f3',ink:'#ffffff'}
].map(Object.freeze));
const clone=x=>JSON.parse(JSON.stringify(x));
function starter(){return {name:'The color trail',spawn:{x:80,y:520},flag:{x:1360,y:360},blocks:[{x:0,y:560,w:1440,h:80,n:0},...[[200,440,1],[400,360,2],[600,400,3],[800,320,4],[1000,360,5],[1200,280,6]].map(([x,y,n])=>({x,y,w:80,h:40,n})),...[[320,480],[520,480],[720,440],[920,440],[1120,400],[1320,400]].map(([x,y])=>({x,y,w:80,h:40,n:0}))],spikes:[{x:360,y:520,w:80,h:40},{x:680,y:520,w:80,h:40},{x:960,y:520,w:120,h:40}]};}
const overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
function validate(l){if(!l||!Array.isArray(l.blocks)||!Array.isArray(l.spikes)||l.blocks.length+l.spikes.length>600)return ['Invalid level file. Use an exported Step by Step level.'];if(l.blocks.some(b=>!b||typeof b!=='object')||l.spikes.some(b=>!b||typeof b!=='object'))return ['Invalid level pieces. Choose an exported level.'];const errors=[];if(l.allowReverse!==undefined&&typeof l.allowReverse!=='boolean')errors.push('Reverse order must be on or off.');for(const k of ['spawn','flag'])if(!l[k]||!Number.isFinite(l[k].x)||!Number.isFinite(l[k].y)||l[k].x<0||l[k].x>W-40||l[k].y<0||l[k].y>H-40)errors.push('Place '+k+' inside the meadow.');for(const b of [...l.blocks,...l.spikes])if(!['x','y','w','h'].every(k=>Number.isFinite(b[k]))||b.w<1||b.h<1||b.x<0||b.y<0||b.x+b.w>W||b.y+b.h>H)errors.push('Keep every piece inside the meadow.');for(const b of l.blocks)if(!Number.isInteger(b.n)||b.n<0||b.n>6)errors.push('Choose a red, orange, yellow, green, blue, purple, or plain block.');for(let n=1;n<=6;n++)if(l.blocks.filter(b=>b.n===n).length!==1)errors.push('Place exactly one '+COLORS[n-1].name.toLowerCase()+' block.');return [...new Set(errors)];}
class Game{constructor(level,emit=()=>{}){this.emit=emit;this.level=clone(level);this.reset();}reset(){this.p={x:this.level.spawn.x+7,y:this.level.spawn.y+4,w:26,h:36,vx:0,vy:0,ground:false};this.progress=0;this.direction=0;this.collected=new Set();this.result=null;this.won=false;this.coyote=0;this.buffer=0;this.lastBlock=null;this.contacts=new Set();this.emit('reset');}get nextColors(){return this.progress===6?[]:this.progress===0?(this.level.allowReverse?[1,6]:[1]):[this.direction===-1?6-this.progress:this.progress+1];}
get allCollected(){return this.collected.size===6;}
get perfect(){return this.progress===6;}
collect(b){
 if(this.won||!b.n)return;
 const last=this.progress?(this.direction===-1?7-this.progress:this.progress):null;
 if(b.n===last)return;
 this.collected.add(b.n);
 const expected=this.nextColors,finished=this.progress===6;
 if(expected.includes(b.n)){
  if(this.progress===0)this.direction=b.n===6?-1:1;
  this.progress++;this.emit('color',b.n);
 }else{
  this.progress=0;this.direction=0;this.emit('order',b.n,expected.length===1?expected[0]:finished?7:0);
 }
}
step(dt,input){if(this.won)return;const p=this.p;this.buffer=Math.max(0,this.buffer-dt);if(input.jump)this.buffer=.13;this.coyote=p.ground?.1:Math.max(0,this.coyote-dt);p.vx=(input.right?260:0)-(input.left?260:0);if(this.buffer>0&&this.coyote>0){p.vy=-680;p.ground=false;this.coyote=0;this.buffer=0;this.emit('jump');}p.vy=Math.min(p.vy+1600*dt,900);const touched=new Set();p.x+=p.vx*dt;p.x=Math.max(0,Math.min(W-p.w,p.x));for(const b of this.level.blocks)if(overlap(p,b)){if(p.vx>0){p.x=b.x-p.w;touched.add(b);}else if(p.vx<0){p.x=b.x+b.w;touched.add(b);}}const oldBottom=p.y+p.h;p.y+=p.vy*dt;p.ground=false;let landed=null;for(const b of this.level.blocks)if(overlap(p,b)){if(p.vy>=0&&oldBottom<=b.y+2){p.y=b.y-p.h;p.vy=0;p.ground=true;landed=b;touched.add(b);}else if(p.vy<0){p.y=b.y+b.h;p.vy=0;touched.add(b);}}// Trigger once per contact, including sides and underside. Sliding along a face
// must not repeatedly collect or reset; leaving and returning starts a new contact.
const contacts=new Set();for(const b of this.level.blocks){const horizontal=p.x<b.x+b.w&&p.x+p.w>b.x,vertical=p.y<b.y+b.h&&p.y+p.h>b.y;if((horizontal&&(Math.abs(p.y+p.h-b.y)<.01||Math.abs(p.y-b.y-b.h)<.01))||(vertical&&(Math.abs(p.x+p.w-b.x)<.01||Math.abs(p.x-b.x-b.w)<.01)))contacts.add(b);}
for(const b of contacts)touched.add(b);for(const b of touched)if(!this.contacts.has(b))this.collect(b);this.contacts=contacts;this.lastBlock=landed;for(const s of this.level.spikes){const hazard={x:s.x+5,y:s.y+9,w:s.w-10,h:s.h-9};if(overlap(p,hazard)){this.reset();this.emit('death');return;}}if(p.y>H+50){this.reset();this.emit('death');return;}const flag={x:this.level.flag.x,y:this.level.flag.y-65,w:40,h:105};if(overlap(p,flag)){if(this.allCollected){this.result=this.perfect?'perfect':'normal';this.won=true;this.emit('win');}else this.emit('locked');}}}
const api={W,H,G,COLORS,starter,clone,overlap,validate,Game};if(typeof module!=='undefined')module.exports=api;else root.Trail=api;
})(typeof window!=='undefined'?window:globalThis);
