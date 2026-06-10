import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Works } from '@/components/Works';
import { Expertise } from '@/components/Expertise';
import { Process } from '@/components/Process';
import { Perks } from '@/components/Perks';
import { CTA } from '@/components/CTA';
import { Founder } from '@/components/Founder';
import { FAQ } from '@/components/FAQ';
import { SiteFooter } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Works />
        <Expertise />
        <Process />
        <Perks />
        <CTA />
        <Founder />
        <FAQ />
      </main>
      <SiteFooter />
    </>
  );
}
