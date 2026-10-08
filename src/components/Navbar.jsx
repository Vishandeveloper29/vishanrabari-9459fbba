import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import MusicToggle from './MusicToggle';
const links = [['ABOUT','about'],['SERVICES','services'],['WORK','projects'],['SKILLS','skills'],['JOURNEY','journey'],['CONTACT','contact']];
export default function Navbar(){
 const [open,setOpen]=useState(false);
 return <header className="topbar">
  <nav className="nav-shell">
   <a href="#home" className="brand"><Logo className="brand-logo" size={44}/><span><strong>VISHAN RABARI</strong><small>DEVELOPER / CO-FOUNDER @ KV</small></span></a>
   <div className="nav-links">{links.map(([label,id])=><a key={id} href={'#'+id}>{label}</a>)}</div>
   <MusicToggle/>
   <a className="nav-cta" href="#contact">START A PROJECT <ArrowUpRight size={16}/></a>
   <button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
  </nav>
  {open&&<div className="mobile-nav">{links.map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={18}/></a>)}</div>}
 </header>
}
