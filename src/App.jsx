import { useState, useCallback } from 'react';
import Cursor from './components/Cursor';
import Grain from './components/Grain';
import Spotlight from './components/Spotlight';
import ScrollProgress from './components/ScrollProgress';
import SectionDots from './components/SectionDots';
import ScrollTopButton from './components/ScrollTopButton';
import LiveStatus from './components/LiveStatus';
import useMicroInteractions from './hooks/useMicroInteractions';
import useAmbientEffects from './hooks/useAmbientEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ProjectImageTabs from './components/ProjectImageTabs';
import Skills from './components/Skills';
import Journey from './components/Journey';
import CTABanner from './components/CTABanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StudioLoader from './components/StudioLoader';

function Stripe(){return <div className="mx-stripe-band" aria-hidden="true"/>}

export default function App(){
 const [loading,setLoading]=useState(true);
 const done=useCallback(()=>setLoading(false),[]);
 useMicroInteractions();
 useAmbientEffects();
 return <div className="site-shell">
  {loading && <StudioLoader onDone={done}/>} 
  <Cursor/>
  <Grain/>
  <Spotlight/>
  <ScrollProgress/>
  <SectionDots/>
  <ScrollTopButton/>
  <LiveStatus/>
  <Navbar/>
  <main>
   <Hero/><Stripe/><About/><Stripe/><Services/><Stripe/><ProjectImageTabs/><Stripe/><Skills/><Stripe/><Journey/><Stripe/><CTABanner/><Stripe/><Contact/>
  </main>
  <Footer/>
 </div>
}
