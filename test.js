const assert=require('node:assert/strict');const {Game,starter,validate,COLORS}=require('./engine');
const dt=1/120;let events=[];let g=new Game(starter(),(t,n)=>events.push([t,n]));
for(let i=0;i<20;i++)g.step(dt,{});
function leap(target){let began=false;for(let i=0;i<170;i++){const dx=target-(g.p.x+g.p.w/2);g.step(dt,{right:dx>3,left:dx< -3,jump:!began});began=true;if(i>10&&g.p.ground)return;}throw Error('Did not land');}
for(let n=1;n<=6;n++){const b=g.level.blocks.find(b=>b.n===n);leap(b.x+40);assert.equal(g.progress,n,`Reach ${COLORS[n-1].name} block: ${JSON.stringify(g.p)}`);}
assert.deepEqual(events.filter(([type])=>type==='color').map(([,id])=>COLORS[id-1].name),['Red','Orange','Yellow','Green','Blue','Purple']);
// Walk off the last platform onto the finish.
for(let i=0;i<150;i++)g.step(dt,{right:true});assert.equal(g.won,true,'Complete the starter level');
g=new Game(starter());g.collect({n:1});g.collect({n:0});assert.equal(g.progress,1);g.collect({n:3});assert.equal(g.progress,0);g.collect({n:1});g.collect({n:1});assert.equal(g.progress,1);g.p.x=370;g.p.y=510;g.step(dt,{});assert.equal(g.progress,0);assert.equal(g.p.x,87);g.p.x=1360;g.p.y=490;g.step(dt,{});assert.equal(g.won,false);g.p.y=700;g.step(dt,{});assert.equal(g.p.x,87);assert.deepEqual(validate(starter()),[]);assert.ok(validate({...starter(),blocks:[]}).length);assert.ok(validate({...starter(),spawn:{x:NaN,y:0}}).length);console.log('PASS: full starter playthrough, sequence order, plain blocks, repeat blocks, spikes, falls, locked flag, level validation.');
