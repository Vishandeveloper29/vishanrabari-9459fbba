import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
const links = [['ABOUT','about'],['SERVICES','services'],['WORK','projects'],['SKILLS','skills'],['JOURNEY','journey'],['CONTACT','contact']];
export default function Navbar(){
 const [open,setOpen]=useState(false);
 return <header className="topbar">
  <nav className="nav-shell">
   <a href="#home" className="brand"><img src="/vr-logo.svg" alt="VR — Vishan Rabari"/><span><strong>VISHAN RABARI</strong><small>DEVELOPER / CO-FOUNDER @ KV</small></span></a>
   <div className="nav-links">{links.map(([label,id])=><a key={id} href={'#'+id}>{label}</a>)}</div>
   <a className="nav-cta" href="#contact">START A PROJECT <ArrowUpRight size={16}/></a>
   <button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
  </nav>
  {open&&<div className="mobile-nav">{links.map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={18}/></a>)}</div>}
 </header>
}
