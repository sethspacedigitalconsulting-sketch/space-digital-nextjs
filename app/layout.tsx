import type { Metadata } from 'next';
import { Instrument_Serif, JetBrains_Mono, Pacifico, Geist } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { FloatingSocials } from "@/components/FloatingSocials"; // Imported our floating sidebar controller
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});
const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Space Digital & AI Consulting — Systems for Brands That Refuse to Look Ordinary',
  description: 'High-performance digital marketing fused with intelligent AI automation. Engineered for companies moving faster than their industry.',
  keywords: ['AI consulting', 'digital marketing', 'n8n automation', 'Nairobi', 'Seth Onyango', 'Space Digital'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(instrumentSerif.variable, jetbrainsMono.variable, pacifico.variable, "font-sans", geist.variable)}>
      <body>
        <SmoothScroll />
        <CustomCursor />
        {children}

        {/* Immersive, persistent right-docked social tooltip panel tracking conversions 24/7 */}
        <FloatingSocials />
      </body>
    </html>
  );
}