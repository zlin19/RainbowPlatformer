(function(root){
'use strict';
// C major, C4–C5: start, six colors, then the flag. Generated locally, no assets.
const NOTES=Object.freeze([261.625565,293.664768,329.627557,349.228231,391.995436,440,493.883301,523.251131]);
function create({makeContext,enabled=true}={}){
 let context=null,pending=null,unlocking=null,failed=false;const voices=new Set();
 const ready=()=>context?.state==='running';
 function silence(){pending=null;for(const voice of voices){try{voice.gain.gain.cancelScheduledValues(context.currentTime);voice.gain.gain.setTargetAtTime(.0001,context.currentTime,.005);voice.osc.stop(context.currentTime+.025);}catch{}}voices.clear();}
 function play(index){
  if(!enabled)return;if(!ready()){pending=index;return;}
  pending=null;const now=context.currentTime,duration=index===7?.85:.3;
  // Soft attack prevents clicks; a quiet octave overtone gives a small bell character.
  for(const [multiple,volume]of [[1,.11],[2,.018]]){
   const osc=context.createOscillator(),gain=context.createGain(),voice={osc,gain};
   osc.type='sine';osc.frequency.setValueAtTime(NOTES[index]*multiple,now);
   gain.gain.setValueAtTime(.0001,now);gain.gain.linearRampToValueAtTime(volume,now+.008);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
   osc.connect(gain);gain.connect(context.destination);voices.add(voice);
   osc.onended=()=>{voices.delete(voice);osc.disconnect();gain.disconnect();};osc.start(now);osc.stop(now+duration+.02);
  }
 }
 function note(index){if(Number.isInteger(index)&&index>=0&&index<NOTES.length)play(index);}
 function start(){silence();note(0);}
 function setEnabled(value){enabled=!!value;if(!enabled)silence();}
 async function unlock(){
  if(!enabled)return false;if(unlocking)return unlocking;
  // Context creation/resume happens only inside a user's pointer/key event.
  try{failed=false;context ||= makeContext();const resumed=context.state==='running'?Promise.resolve():context.resume();
   unlocking=Promise.resolve(resumed).then(()=>{if(ready()&&enabled&&pending!==null)play(pending);return ready();}).catch(()=>{failed=true;return false;}).finally(()=>{unlocking=null;});return unlocking;
  }catch{failed=true;return false;}
 }
 return {note,start,silence,setEnabled,unlock,get enabled(){return enabled;},get ready(){return ready();},get failed(){return failed;}};
}
const api={NOTES,create};if(typeof module!=='undefined')module.exports=api;else root.TrailAudio=api;
})(typeof window!=='undefined'?window:globalThis);
