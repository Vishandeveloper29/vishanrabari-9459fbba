import {useState} from 'react';
import {ArrowUpRight,Car,Globe,Zap,BadgeCheck,ExternalLink} from 'lucide-react';
import useReveal from '../hooks/useReveal';
import bmw from '../assets/work/build-05.webp';import truebuild from '../assets/work/build-03.webp';import gausala from '../assets/work/build-04.webp';import dmloop from '../assets/work/build-01.webp';import eventcure from '../assets/work/build-02.webp';
const projects=[
 {title:'DMLoop',cat:'AUTOMATION / SAAS',image:dmloop,desc:'A focused SaaS experience for social automation workflows.',icon:Zap,url:'https://www.dmloop.app/'},
 {title:'EventCure',cat:'EVENT OPERATIONS',image:eventcure,desc:'A command-center style workspace for guests, rooms, transport and schedules.',icon:Globe,url:'https://eventcure-livid.vercel.app/'},
 {title:'TrueBuild',cat:'BUSINESS / COMMERCE',image:truebuild,desc:'A conversion-focused digital presence for a product-led business.',icon:BadgeCheck,url:'https://truebuilddeck.vercel.app/'},
 {title:'Gau Sala',cat:'INFORMATION / COMMUNITY',image:gausala,desc:'A structured information experience built around trust and clarity.',icon:Globe,url:'#'},
 {title:'BMW 3D',cat:'AUTOMOTIVE / 3D',image:bmw,desc:'An immersive automotive viewer concept built around visual depth.',icon:Car,url:'#'}
];
export default function ProjectImageTabs(){const [active,setActive]=useState(0);const p=projects[active];const Icon=p.icon;const [ref,inView]=useReveal();return <section id="projects" ref={ref} className={`section lime-section ${inView?'in-view':''}`}>
 <div className="page-wrap"><div className="section-top"><div><div className="section-tag reveal">004 / SELECTED WORK</div><h2 className="mega reveal reveal-1">THE<br/><span>WORK</span><br/><em>SECTION.</em></h2></div><p className="lead reveal reveal-2">Real builds, concepts and experiments. The visual system changes with the problem — the attention to detail does not.</p></div>
 <div className="project-layout reveal reveal-3"><div className="project-list">{projects.map((x,i)=><button key={x.title} className={'project-tab '+(active===i?'active':'')} onClick={()=>setActive(i)}><span>0{i+1}</span><b>{x.title}</b><small>{x.cat}</small><ArrowUpRight size={19}/></button>)}</div>
 <article className="project-feature"><div className="project-image"><img src={p.image} alt={p.title}/><div className="image-stamp">KV / {String(active+1).padStart(2,'0')}</div></div><div className="project-info"><div><div className="project-cat"><Icon size={18}/> {p.cat}</div><h3>{p.title}</h3><p>{p.desc}</p></div><a className="btn black" href={p.url} target="_blank" rel="noreferrer">OPEN PROJECT <ExternalLink size={17}/></a></div></article></div>
 </div></section>}
