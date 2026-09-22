(function(root){
'use strict';
const {COLORS}=typeof module!=='undefined'?require('./engine'):root.Trail;
function create(x,y,reduced=false){return {x,y,age:0,reduced,particles:Array.from({length:reduced?36:216},(_,i)=>{const a=i*2.39996,speed=160+(i%13)*24;return {x,y,vx:Math.cos(a)*speed-110,vy:Math.sin(a)*speed-210,color:COLORS[i%6].fill,size:5+i%7,spin:(i%2?1:-1)*(2+i%5),angle:a,delay:Math.floor(i/72)*.2,life:2.4+(i%9)*.13};})};}
function draw(ctx,fx,dt){ctx.clearRect(0,0,1440,640);if(!fx)return;fx.age+=dt;ctx.save();if(fx.reduced){for(let i=0;i<6;i++){ctx.strokeStyle=COLORS[i].fill;ctx.lineWidth=5;ctx.beginPath();ctx.arc(fx.x,fx.y,30+i*10,0,Math.PI*2);ctx.stroke();}ctx.restore();return;}
 for(let i=0;i<6;i++){const age=fx.age-i*.055;if(age>0&&age<1.4){ctx.globalAlpha=(1-age/1.4)*.8;ctx.strokeStyle=COLORS[i].fill;ctx.lineWidth=9-i*.6;ctx.beginPath();ctx.arc(fx.x,fx.y,20+age*(240+i*25),0,Math.PI*2);ctx.stroke();}}
 for(const p of fx.particles){const age=fx.age-p.delay;if(age<0||age>p.life)continue;ctx.globalAlpha=Math.min(1,(p.life-age)*1.5);const x=p.x+p.vx*age,y=p.y+p.vy*age+100*age*age;ctx.save();ctx.translate(x,y);ctx.rotate(p.angle+age*p.spin);ctx.fillStyle=p.color;ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*.55);ctx.restore();}ctx.restore();}
const api={create,draw};if(typeof module!=='undefined')module.exports=api;else root.TrailVictory=api;
})(typeof window!=='undefined'?window:globalThis);
