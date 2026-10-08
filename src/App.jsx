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
import useInteractive from './hooks/useInteractive';
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
import Playground from './components/Playground';
import ToastHost from './components/ToastHost';
import CommandPalette from './components/CommandPalette';
import FloatingDock from './components/FloatingDock';
import useKonami from './hooks/useKonami';
import { confetti } from './lib/confetti';
import { toast } from './lib/toast';

function Stripe(){return <div className="mx-stripe-band" aria-hidden="true"/>}

export default function App(){
 const [loading,setLoading]=useState(true);
 const done=useCallback(()=>setLoading(false),[]);
 useMicroInteractions();
 useAmbientEffects();
 useInteractive();
 useKonami(useCallback(()=>{confetti();toast('🎮 Cheat code unlocked: +30 lives');},[]));
 return <div className="site-shell">
  <a className="skip-link" href="#about">Skip to content</a>
  {loading && <StudioLoader onDone={done}/>} 
  <Cursor/>
  <Grain/>
  <Spotlight/>
  <ScrollProgress/>
  <SectionDots/>
  <ScrollTopButton/>
  <LiveStatus/>
  <ToastHost/>
  <CommandPalette/>
  <FloatingDock/>
  <Navbar/>
  <main>
   <Hero/><Stripe/><About/><Stripe/><Services/><Stripe/><ProjectImageTabs/><Stripe/><Skills/><Stripe/><Journey/><Stripe/><Playground/><Stripe/><CTABanner/><Stripe/><Contact/>
  </main>
  <Footer/>
 </div>
}
