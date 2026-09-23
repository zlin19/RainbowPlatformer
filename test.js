const assert=require('node:assert/strict');const {Game,starter,validate,COLORS}=require('./engine');
const dt=1/120;let events=[];let g=new Game(starter(),(t,n)=>events.push([t,n]));
for(let i=0;i<20;i++)g.step(dt,{});
function leap(target){let began=false;for(let i=0;i<170;i++){const dx=target-(g.p.x+g.p.w/2);g.step(dt,{right:dx>3,left:dx< -3,jump:!began});began=true;if(i>10&&g.p.ground)return;}throw Error('Did not land');}
for(let n=1;n<=6;n++){const b=g.level.blocks.find(b=>b.n===n);leap(b.x+40);assert.equal(g.progress,n,`Reach ${COLORS[n-1].name} block: ${JSON.stringify(g.p)}`);}
assert.deepEqual(events.filter(([type])=>type==='color').map(([,id])=>COLORS[id-1].name),['Red','Orange','Yellow','Green','Blue','Purple']);
// Walk off the last platform onto the finish.
for(let i=0;i<150;i++)g.step(dt,{right:true});assert.equal(g.won,true,'Complete the starter level');
g=new Game(starter());g.collect({n:1});g.collect({n:0});assert.equal(g.progress,1);g.collect({n:3});assert.equal(g.progress,0);g.collect({n:1});g.collect({n:1});assert.equal(g.progress,1);g.p.x=370;g.p.y=510;g.step(dt,{});assert.equal(g.progress,0);assert.equal(g.p.x,87);g.p.x=1360;g.p.y=490;g.step(dt,{});assert.equal(g.won,false);g.p.y=700;g.step(dt,{});assert.equal(g.p.x,87);assert.deepEqual(validate(starter()),[]);assert.ok(validate({...starter(),blocks:[]}).length);assert.ok(validate({...starter(),spawn:{x:NaN,y:0}}).length);console.log('PASS: full starter playthrough, sequence order, plain blocks, repeat blocks, spikes, falls, locked flag, level validation.');

// Real collisions from each face, holding contact, separation/re-entry and plain support.
const fixture={spawn:{x:20,y:520},flag:{x:1380,y:520},blocks:[{x:0,y:560,w:1440,h:80,n:0},{x:400,y:400,w:80,h:40,n:1}],spikes:[]};
for(const face of ['left','right','top','bottom']){
 const seen=[];const game=new Game(fixture,(...e)=>seen.push(e));
 Object.assign(game.p,face==='left'?{x:373,y:404}:face==='right'?{x:481,y:404}:face==='top'?{x:425,y:363,vy:120}:{x:425,y:441,vy:-300});
 game.step(dt,{right:face==='left',left:face==='right'});assert.equal(game.progress,1,face+' collects');
 assert.equal(seen.filter(e=>e[0]==='color').length,1);
}
const heldEvents=[];const held=new Game(fixture,(...e)=>heldEvents.push(e));Object.assign(held.p,{x:425,y:363,vy:120});held.step(dt,{});
for(let i=0;i<120;i++)held.step(dt,{});assert.equal(held.progress,1,'standing is one contact');
held.step(dt,{jump:true});for(let i=0;i<120;i++)held.step(dt,{});assert.equal(held.progress,1,'leaving then returning to the latest color is safe');assert.equal(heldEvents.filter(e=>e[0]==='order').length,0);assert.equal(heldEvents.filter(e=>e[0]==='color').length,1,'repeat does not recollect or replay effects');
const slide=new Game({...fixture,blocks:[fixture.blocks[0],{x:400,y:400,w:80,h:160,n:1}]});Object.assign(slide.p,{x:373,y:450});for(let i=0;i<120;i++)slide.step(dt,{right:true});assert.equal(slide.progress,1,'sliding and holding a side is one contact');
const strict=new Game(fixture);strict.collect({n:1});strict.collect({n:2});strict.collect({n:0});assert.equal(strict.progress,2);strict.collect({n:1});assert.equal(strict.progress,0,'old red is wrong after orange');strict.collect({n:1});assert.equal(strict.progress,1,'fresh red restarts collection');
console.log('PASS all four faces, held/sliding contacts, repeat-color reset, expected-color feedback, fresh sequence');

for(let n=1;n<=6;n++){
 const events=[];const game=new Game(fixture,(...e)=>events.push(e));for(let k=1;k<=n;k++)game.collect({n:k});const count=events.length;
 game.collect({n});game.collect({n:0});game.collect({n});assert.equal(game.progress,n,'latest color stays safe across plain blocks');assert.equal(events.length,count,'no duplicate collection or death');
 if(n>1){game.collect({n:n-1});assert.equal(game.progress,0,'earlier color still resets');assert.deepEqual(events.at(-1),['order',n-1,n+1]);}
}
console.log('PASS latest-color repeats for all six colors, plain interludes, no duplicate events, earlier-color resets');
