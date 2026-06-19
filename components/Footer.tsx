'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function LogoMark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ position: 'relative', width: '36px', height: '36px' }}>
        <Image
          src="/workflows/logo.png"
          alt="Space Digital Logo"
          fill
          sizes="36px"
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-pacifico, cursive)', fontSize: '1.05rem', color: 'var(--text)', letterSpacing: '0.01em' }}>space</span>
        <span style={{ fontFamily: 'var(--sans)', fontSize: '0.42rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: 2 }}>— go digital —</span>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const isMobile = useIsMobile();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: isMobile ? '2.5rem 1.25rem 1.5rem' : '4rem',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
      gap: isMobile ? '2rem' : '3rem',
      alignItems: 'start',
    }}>

      {/* Brand column */}
      <div>
        <LogoMark />
        <p style={{ fontSize: '0.72rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--text-dim)', fontFamily: 'var(--sans)', marginTop: '1.2rem', maxWidth: '24ch' }}>
          Systems for brands that refuse to look ordinary.
        </p>
      </div>

      {/* Navigate column */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '0.4rem', fontFamily: 'var(--sans)' }}>Navigate</span>
        {[
          { label: 'Ecosystem', href: '#ecosystem' },
          { label: 'Work', href: '#work' },
          { label: 'About', href: '#about' },
          { label: 'Initiate', href: '#contact' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'var(--sans)', cursor: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Contact column */}
      <div>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--signal)', display: 'block', marginBottom: '1.2rem', fontFamily: 'var(--sans)' }}>Contact</span>
        <a
          href="mailto:seth.spacedigitalconsulting@gmail.com"
          style={{
            fontSize: isMobile ? '0.7rem' : '0.78rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontFamily: 'var(--sans)',
            cursor: 'none',
            display: 'block',
            marginBottom: '0.5rem',
            wordBreak: 'break-all',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          seth.spacedigitalconsulting@gmail.com
        </a>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>Nairobi, Kenya</span>
      </div>

      {/* Copyright bar */}
      <div style={{
        gridColumn: '1 / -1',
        borderTop: '1px solid var(--border)',
        paddingTop: '1.5rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? '0.5rem' : '0',
      }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>
          © {new Date().getFullYear()} Space Digital &amp; AI Consulting. All rights reserved.
        </span>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--sans)', letterSpacing: '0.08em' }}>
          Nairobi · Remote-first
        </span>
      </div>
    </footer>
  );
}