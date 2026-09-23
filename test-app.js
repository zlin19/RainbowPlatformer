const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
function boot(storage={data:{},getItem(k){return this.data[k]||null},setItem(k,v){this.data[k]=v}}){
 const elements={};const paint=new Proxy({},{get:(t,k)=>t[k]||(()=>{}),set:(t,k,v)=>(t[k]=v,true)});
 function element(tag='div'){return {tagName:tag.toUpperCase(),hidden:false,value:'',textContent:'',innerHTML:'',children:[],style:{},attributes:{},classList:{toggle(){}},setAttribute(k,v){this.attributes[k]=v},append(...items){this.children.push(...items)},prepend(item){this.children.unshift(item)},replaceChildren(){this.children=[]},addEventListener(){},focus(){},scrollIntoView(){},getContext(){return paint}};}
 const doc={documentElement:{lang:'en'},getElementById(id){return elements[id]||=(element(id==='game'||id==='victoryFx'?'canvas':'div'))},createElement:element,querySelectorAll(){return[]},activeElement:{tagName:'BODY'}};
 for(const id of ['overlay','levelLibrary','editor'])doc.getElementById(id).hidden=true;
 const context={TrailI18n:require('./i18n'),Trail:require('./engine'),TrailLevels:require('./levels'),TrailVictory:require('./victory'),document:doc,localStorage:storage,requestAnimationFrame(){},setTimeout(){},Blob,URL,console};context.window=context;context.addEventListener=()=>{};context.matchMedia=()=>({matches:false});vm.createContext(context);vm.runInContext(fs.readFileSync('app.js','utf8'),context);return {run:s=>vm.runInContext(s,context),elements,storage};
}
const app=boot();assert.equal(app.run('activeId'),'builtin-1');app.run('selectLevel(BUILTINS[9])');assert.equal(app.elements.levelTitle.textContent,'Rainbow summit');assert.equal(app.run('game.progress'),0);
app.run('selectLevel(BUILTINS[0]); for(let n=1;n<=6;n++)game.collect({n}); game.p.x=level.flag.x;game.p.y=level.flag.y-20;game.step(1/120,{})');assert.equal(app.run('game.won'),true);assert.equal(app.run('celebration.particles.length'),216);assert.equal(app.run("store.completed.includes('builtin-1')"),true);assert.equal(app.elements.overlay.hidden,true);app.run('for(let t=50;t<=1500;t+=50)frame(t)');assert.equal(app.elements.overlay.hidden,false);assert.equal(app.elements.winLevels.hidden,false);assert.match(app.elements.overlayTitle.textContent,/Every color/);assert.equal((app.elements.sequence.innerHTML.match(/color-step done/g)||[]).length,6);
app.run('restart()');assert.equal(app.run('celebration'),null);assert.equal(app.elements.overlay.hidden,true);assert.equal((app.elements.sequence.innerHTML.match(/color-step done/g)||[]).length,0);
app.run('setMode("edit"); document.getElementById("levelName").value="Saved test"; saveExtra(false)');assert.equal(app.run('store.levels.length'),1);assert.equal(app.elements.levelLibrary.hidden,false);app.run('selectLevel(store.levels[0]);setMode("edit");document.getElementById("levelName").value="Updated test";saveExtra(true)');assert.equal(app.run('store.levels.length'),1);assert.equal(app.run('store.levels[0].name'),'Updated test');assert.equal(app.run('BUILTINS[0].name'),'First colors');const again=boot(app.storage);assert.equal(again.run('store.levels[0].name'),'Updated test');console.log('PASS app skip-level selection, win trigger/overlay/effects, reset, progress states, library save/update/reload, built-in preservation');

// Switching languages preserves live gameplay and persists independently of level data.
const translated=boot();translated.run('game.collect({n:1});game.p.x=321');
translated.elements.languageToggle.onclick();
assert.equal(translated.run('document.documentElement.lang'),'zh-CN');
assert.equal(translated.run('game.progress'),1);assert.equal(translated.run('game.p.x'),321);
assert.equal(translated.elements.levelTitle.textContent,'初识色彩');
assert.match(translated.elements.status.textContent,/已收集红色/);
assert.equal(boot(translated.storage).run('locale.language'),'zh');
translated.run('pause()');translated.elements.languageToggle.onclick();
assert.match(translated.elements.overlayTitle.textContent,/moment between jumps/);
assert.equal(translated.run('paused'),true);
function win(a){a.run('for(let n=1;n<=6;n++)game.collect({n});game.p.x=level.flag.x;game.p.y=level.flag.y-20;game.step(1/120,{});showWin()');}
const next=boot();win(next);assert.equal(next.elements.nextLevel.hidden,false);
assert.match(next.elements.overlayText.textContent,/Continue to “Up the rainbow”/);
next.elements.languageToggle.onclick();assert.match(next.elements.overlayText.textContent,/要进入下一关“彩虹阶梯”/);
next.elements.nextLevel.onclick();assert.equal(next.run('activeId'),'builtin-2');assert.equal(next.run('game.progress'),0);assert.equal(next.elements.overlay.hidden,true);
next.run('selectLevel(BUILTINS[9])');win(next);assert.equal(next.elements.nextLevel.hidden,true);assert.match(next.elements.overlayText.textContent,/最后一个内置关卡/);assert.equal(next.run('store.completed.length'),2);
next.run('store.save(BUILTINS[0],"First colors");store.save(BUILTINS[0],"我的路线");selectLevel(store.levels[0])');
assert.equal(next.elements.levelTitle.textContent,'First colors');win(next);assert.equal(next.elements.nextLevel.hidden,false);next.elements.nextLevel.onclick();assert.equal(next.elements.levelTitle.textContent,'我的路线');win(next);assert.equal(next.elements.nextLevel.hidden,true);
next.run('setMode("edit");setMode("play")');win(next);assert.equal(next.elements.nextLevel.hidden,true);assert.match(next.elements.overlayText.textContent,/试玩成功/);
const unavailable={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}};
const fallback=boot(unavailable);fallback.elements.languageToggle.onclick();assert.equal(fallback.run('locale.language'),'zh');
const i18n=require('./i18n').create(unavailable,'zh-CN');assert.equal(i18n.t('Click the meadow to place Spike.'),'点击场景放置尖刺。');assert.equal(i18n.t('Place exactly one red block.'),'请放置且仅放置一个红色平台。');
console.log('PASS language persistence, live progress, pause, localized next-level prompt, next-level reset, final/skipped levels, custom sequence/name preservation, playtest and unavailable storage');
