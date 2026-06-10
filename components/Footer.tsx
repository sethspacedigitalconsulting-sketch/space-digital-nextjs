'use client';

function LogoMark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#FF6B2B" />
        <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <ellipse cx="20" cy="20" rx="18" ry="5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-pacifico, cursive)', fontSize: '1.05rem', color: 'var(--text)', letterSpacing: '0.01em' }}>space</span>
        <span style={{ fontFamily: 'var(--sans)', fontSize: '0.42rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: 2 }}>â€” go digital â€”</span>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem', alignItems: 'start' }}>
      <div>
        <LogoMark />
        <p style={{ fontSize: '0.72rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--text-dim)', fontFamily: 'var(--sans)', marginTop: '1.2rem', maxWidth: '24ch' }}>
          Systems for brands that refuse to look ordinary.
        </p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--signal)', marginBottom: '0.4rem', fontFamily: 'var(--sans)' }}>Navigate</span>
        {[
          { label: 'Ecosystem', href: '#ecosystem' },
          { label: 'Work', href: '#work' },
          { label: 'About', href: '#about' },
          { label: 'Initiate', href: 'mailto:seth.spacedigitalconsulting@gmail.com' },
        ].map(({ label, href }) => (
          <a key={label} href={href} style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'var(--sans)', cursor: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            {label}
          </a>
        ))}
      </nav>

      <div>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--signal)', display: 'block', marginBottom: '1.2rem', fontFamily: 'var(--sans)' }}>Contact</span>
        <a href="mailto:seth.spacedigitalconsulting@gmail.com" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'var(--sans)', cursor: 'none', display: 'block', marginBottom: '0.5rem' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
          seth.spacedigitalconsulting@gmail.com
        </a>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>Nairobi, Kenya</span>
      </div>

      <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--sans)' }}>
          Â© {new Date().getFullYear()} Space Digital &amp; AI Consulting. All rights reserved.
        </span>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--sans)', letterSpacing: '0.08em' }}>
          Nairobi Â· Remote-first
        </span>
      </div>
    </footer>
  );
}
