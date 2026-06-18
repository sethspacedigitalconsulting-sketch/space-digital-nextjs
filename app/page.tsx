import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Works } from '@/components/Works';         // Maps perfectly to your 'Work' link
import { Expertise } from '@/components/Expertise'; // Houses your 'Ecosystem' & tech stacks
import { Process } from '@/components/Process';     // Explains your deployment workflows
import { SystemsCalculator } from '@/components/SystemsCalculator'; // Interactive ROI Slider Engine
import { Perks } from '@/components/Perks';
import { ContactGateway } from '@/components/ContactGateway'; // Active Verbeo/Calendly trigger
import { Founder } from '@/components/Founder';     // Maps perfectly to your 'About' link
import { FAQ } from '@/components/FAQ';
import { SiteFooter } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[#0A0A0B]">
        <Hero />

        {/* Section anchor tags added via your existing or new containers */}
        <div id="work">
          <Works />
        </div>

        <div id="ecosystem">
          <Expertise />
        </div>

        <Process />

        {/* ── Interactive ROI Slider to de-risk pricing ── */}
        <div id="systems">
          <SystemsCalculator />
        </div>

        <Perks />

        {/* ── Live Automation Handshake & Booking Gateway ── */}
        <div id="contact">
          <ContactGateway />
        </div>

        <div id="about">
          <Founder />
        </div>

        <FAQ />
      </main>
      <SiteFooter />
    </>
  );
}