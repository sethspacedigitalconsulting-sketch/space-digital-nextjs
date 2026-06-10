'use client';
import { motion } from 'framer-motion';

const LogoMark = ({ size = 34 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Space Digital logo">
    <circle cx="50" cy="50" r="48" fill="#FF6B2B"/>
    <circle cx="50" cy="50" r="43" fill="none" stroke="#0A0A0A" strokeWidth="1.4"/>
    <g transform="translate(50,36) rotate(-14)">
      <ellipse rx="21" ry="14" fill="#0A0A0A"/>
      <ellipse rx="12" ry="6.5" fill="#FF6B2B"/>
    </g>
    <text x="50" y="67" textAnchor="middle" fontFamily="var(--font-pacifico), cursive" fontSize="19" fill="#0A0A0A">space</text>
    <text x="50" y="79" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="5.5" fill="#0A0A0A" letterSpacing="2.2">- GO DIGITAL -</text>
  </svg>
);

const NAV_LINKS = [
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Work',      href: '#work' },
  { label: 'Systems',   href: '#work' },
  { label: 'About',     href: '#about' },
];

export function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: '-130%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      style={{
        position: 'fixed', top: 24, left: 0, right: 0,
        zIndex: 1000,
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Pill capsule */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 44,
        height: 69,
        padding: '13.6px 13.6px 13.6px 24px',
        background: 'rgba(10,10,11,0.60)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.08), inset 0px -1px 0px rgba(0,0,0,0.40), 0px 32px 48px -24px rgba(0,0,0,0.60)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        pointerEvents: 'all',
      }}>
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <LogoMark />
          <span style={{
            fontFamily: 'var(--sans)', fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1,
          }}>
            Space Digital
          </span>
        </a>

        {/* Links */}
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                style={{
                  fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 400,
                  letterSpacing: '-0.01em', color: 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:seth.spacedigitalconsulting@gmail.com"
          className="btn btn-accent"
          style={{ fontSize: '0.78rem', padding: '0.6rem 1.4rem', flexShrink: 0 }}
        >
          Get in Touch
        </a>
      </div>
    </motion.nav>
  );
}
