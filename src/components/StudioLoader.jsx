import { useEffect, useState } from 'react';
import Logo from './Logo';

const phrases = [
 'PREPARING PIXELS',
 'COMPILING CREATIVITY',
 'CALIBRATING CHAOS',
 'ALIGNING THE GRID',
 'SHIPPING VISHAN RABARI',
];

export default function StudioLoader({ onDone }) {
 const [progress,setProgress]=useState(0);
 useEffect(()=>{
  const start=performance.now();
  const frame=(now)=>{
   const value=Math.min(100,Math.round((now-start)/900*100));
   setProgress(value);
   if(value<100) requestAnimationFrame(frame); else setTimeout(onDone,180);
  };
  requestAnimationFrame(frame);
  return ()=>{};
 },[onDone]);
 const phrase=phrases[Math.min(phrases.length-1,Math.floor(progress/(100/phrases.length)))];
 return <div className="loader" aria-label="Loading Vishan Rabari portfolio">
  <Logo className="loader-badge" size={104}/>
  <div className="loader-mark">VR</div>
  <div className="loader-line"><span style={{width:`${progress}%`}}/></div>
  <div className="loader-meta"><small>VISHAN RABARI / KV AGENCY</small><strong>{String(progress).padStart(2,'0')}%</strong></div>
  <p>{phrase}...</p>
 </div>
}
