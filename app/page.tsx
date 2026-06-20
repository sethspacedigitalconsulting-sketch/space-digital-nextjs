import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Works } from '@/components/Works';
import { Expertise } from '@/components/Expertise';
import { Process } from '@/components/Process';
import { SystemsCalculator } from '@/components/SystemsCalculator';
import { Perks } from '@/components/Perks';
import { ContactGateway } from '@/components/ContactGateway';
import { Founder } from '@/components/Founder';
import { FAQ } from '@/components/FAQ';
import { SiteFooter } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[#0A0A0B]">
        {/* ── 1. HERO SECTION BOUNDS ── */}
        <div id="home">
          <Hero />
        </div>

        {/* ── 2. WORKS SECTION BOUNDS ── */}
        <div id="work">
          <Works />
        </div>

        {/* ── 3. ECOSYSTEM SECTION BOUNDS ── */}
        <div id="ecosystem">
          <Expertise />
        </div>

        {/* ── 4. PROCESS SECTION BOUNDS ── */}
        <div id="system">
          <Process />
        </div>

        {/* ── 5. TERMINAL CALCULATOR BOUNDS ── */}
        <div id="systems">
          <SystemsCalculator />
        </div>

        <Perks />

        {/* ── 6. CONVERSION GATEWAY BOUNDS ── */}
        <div id="contact">
          <ContactGateway />
        </div>

        {/* ── 7. ABOUT THE FOUNDER BOUNDS ── */}
        <div id="about">
          <Founder />
        </div>

        {/* ── 8. FAQ ACCORDION BOUNDS ── */}
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}