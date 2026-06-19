'use client';

import React, { useRef, useState, useEffect } from 'react';

const PROOF_ITEMS = [
  {
    id: 'ulnar',
    num: '01',
    name: 'Ulnar Medical Clinic',
    tag: 'Clinical SEO & Sites',
    year: '2025',
    mediaType: 'video',
    mediaUrl: '/workflows/ulnar.mp4',
    destinationUrl: 'https://www.ulnar-medical.com/'
  },
  {
    id: 'wibify',
    num: '02',
    name: 'Wibify Agency',
    tag: 'Inbound Web Engine',
    year: '2025',
    mediaType: 'image',
    mediaUrl: '/workflows/wibify.png',
    destinationUrl: 'https://wibify.agency/en'
  },
  {
    id: 'meta',
    num: '03',
    name: 'Meta Ads 3.8x ROAS',
    tag: 'Conversion Campaign',
    year: '2026',
    mediaType: 'video',
    mediaUrl: '/workflows/metaads.mp4',
    destinationUrl: 'https://drive.google.com/file/d/1wYD4EQzhS5U0z7Q5pCvemlosOc15zhTm/view?usp=sharing'
  },
  {
    id: 'tiktok',
    num: '04',
    name: 'TikTok 214% Reach',
    tag: 'Velocity Growth Matrix',
    year: '2026',
    mediaType: 'video',
    mediaUrl: '/workflows/tiktokads.mp4',
    destinationUrl: 'https://drive.google.com/file/d/1eJqYCWjvskDqhzLxObfNigfV5xxT5w3c/view?usp=sharing'
  },
  {
    id: 'google',
    num: '05',
    name: 'Google Local 94% Map Pack',
    tag: 'Geo Intent Optimization',
    year: '2026',
    mediaType: 'video',
    mediaUrl: '/workflows/googlelocalads.mp4',
    destinationUrl: 'https://drive.google.com/file/d/1nuj0d_3MwUmuyr_1tOOq-RqA5vXbUTCI/view?usp=sharing'
  }
];

export function Works() {
  const previewRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener('resize', checkViewport);

    // Desktop hover-preview — only attach on pointer devices
    if (!(window.matchMedia?.('(hover: hover)').matches) || window.innerWidth < 768) {
      return () => window.removeEventListener('resize', checkViewport);
    }

    const list = document.querySelector('.works-list');
    const preview = previewRef.current;
    const img = imgRef.current;
    const video = videoRef.current;

    if (!list || !preview || !img || !video) return () => window.removeEventListener('resize', checkViewport);

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let rafId: number | null = null;
    let isActive = false;
    let lastUrl = '', lastType = '';

    const lerp = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      preview.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      if (Math.abs(targetX - currentX) < 0.1 && Math.abs(targetY - currentY) < 0.1 && !isActive) { rafId = null; return; }
      rafId = requestAnimationFrame(lerp);
    };

    const onMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const link = (mouseEvent.target as HTMLElement).closest('.work-link');
      targetX = mouseEvent.clientX;
      targetY = mouseEvent.clientY;

      if (link) {
        const url = link.getAttribute('data-preview') || '';
        const type = link.getAttribute('data-media-type') || '';
        if (url !== lastUrl || type !== lastType) {
          lastUrl = url; lastType = type;
          if (type === 'video') {
            img.style.display = 'none';
            video.style.display = 'block';
            video.src = url;
            video.muted = true; video.loop = true; video.playsInline = true;
            video.play().catch(() => { });
          } else {
            video.style.display = 'none';
            video.removeAttribute('src');
            img.style.display = 'block';
            img.src = url;
          }
        }
        if (!isActive) { isActive = true; preview.classList.add('is-active'); currentX = targetX; currentY = targetY; }
      } else if (isActive) {
        isActive = false; preview.classList.remove('is-active'); video.pause();
      }
      if (!rafId) rafId = requestAnimationFrame(lerp);
    };

    const onMouseLeave = () => { isActive = false; preview.classList.remove('is-active'); video.pause(); };

    list.addEventListener('mousemove', onMouseMove);
    list.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('resize', checkViewport);
      list.removeEventListener('mousemove', onMouseMove);
      list.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="works w-full bg-[#0a0a0b] border-t border-zinc-900 overflow-hidden" id="work">
      <style>{`
        :root {
          --works-easing: cubic-bezier(0.7, 0, 0.3, 1);
          --works-signal: #FF6B2B;
        }
        .works-list { border-top: 1px solid rgba(255,255,255,0.08); margin:0; padding:0; list-style:none; }
        .work-item  { border-bottom: 1px solid rgba(255,255,255,0.08); position:relative; }

        /* ── MOBILE LINK ROW ── */
        .work-link {
          color:#ffffff; text-decoration:none;
          display:flex; flex-direction:column; gap:0.35rem;
          padding:1.25rem 0.5rem;
          position:relative;
          transition: padding-left 0.55s var(--works-easing);
        }
        .work-link-meta {
          display:flex; align-items:center; justify-content:space-between; gap:0.75rem;
        }

        /* ── DESKTOP LINK ROW ── */
        @media (min-width: 768px) {
          .work-link {
            flex-direction:row; align-items:center; gap:2.5rem;
            padding:2.25rem 0.5rem;
          }
          .work-link:hover { padding-left:2.25rem; }
          .work-link-meta { display:contents; }
        }

        .work-link::before {
          content:""; background:var(--works-signal);
          width:0; height:1px; position:absolute;
          top:-1px; left:0; transition:width 0.7s var(--works-easing);
          pointer-events:none;
        }
        .work-link:hover::before { width:100%; }

        .work-num   { font-family:monospace; color:#52525b; letter-spacing:0.04em; font-size:0.78rem; flex-shrink:0; }
        .work-name  { margin:0; font-size:clamp(1.25rem, 5vw, 3.25rem); font-weight:600; line-height:1.1; flex:1; min-width:0; }
        .work-tag   { font-family:monospace; color:#71717a; letter-spacing:0.04em; text-transform:uppercase; font-size:0.72rem; }
        .work-year  { font-family:monospace; color:#71717a; letter-spacing:0.04em; text-transform:uppercase; font-size:0.72rem; }
        .work-arrow { font-family:monospace; color:#52525b; font-size:1.05rem; transition:transform 0.45s var(--works-easing), color 0.4s var(--works-easing); flex-shrink:0; }
        .work-link:hover .work-arrow { color:var(--works-signal); transform:translate(4px,-4px); }

        /* text-roll — desktop hover only */
        .text-roll { display:inline-block; vertical-align:bottom; line-height:1.1; position:relative; overflow:hidden; }
        .text-roll-row { display:block; white-space:nowrap; }
        .text-roll-clone { position:absolute; inset:0; }
        .text-roll-letter { display:inline-block; transform:translateY(0); transition:transform 0.52s var(--works-easing), color 0.45s ease-out; transition-delay:calc(var(--i, 0) * 14ms); }
        .text-roll-clone .text-roll-letter { color:var(--works-signal); transform:translateY(105%); }
        @media (min-width:768px) {
          .work-link:hover .text-roll-row .text-roll-letter { transform:translateY(-105%); }
          .work-link:hover .text-roll-clone .text-roll-letter { transform:translateY(0); }
        }

        /* cursor preview — desktop only */
        .cursor-preview {
          pointer-events:none; z-index:90; opacity:0;
          width:420px; height:280px; border-radius:1rem; overflow:hidden;
          position:fixed; top:0; left:0; transition:opacity 0.4s var(--works-easing);
          will-change:transform,opacity;
          box-shadow:rgba(0,0,0,0.7) 0px 32px 64px -16px, rgba(255,255,255,0.06) 0px 0px 0px 1px;
          background-color:#050506;
        }
        .cursor-preview.is-active { opacity:1; }
        .cursor-preview img, .cursor-preview video { display:block; width:100%; height:100%; object-fit:cover; }
      `}</style>

      <div className="works-inner max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <header className="works-head flex flex-col gap-4 mb-12 md:mb-16">
          <span className="works-eyebrow font-mono tracking-widest text-[#FF6B2B] uppercase text-xs flex items-center gap-2">
            <span className="w-8 h-px bg-[#FF6B2B]" />
            Selected Work / 2024 — 2026
          </span>
          <h2 className="works-title text-3xl md:text-6xl font-bold tracking-tight text-white">
            What we've <em className="text-[#FF6B2B] italic font-serif font-normal">built</em>.
          </h2>
        </header>

        <ul className="works-list">
          {PROOF_ITEMS.map((item) => (
            <li key={item.id} className="work-item group flex flex-col">
              <a
                className="work-link"
                href={item.destinationUrl}
                target={item.destinationUrl !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                data-preview={item.mediaUrl}
                data-media-type={item.mediaType}
              >
                {/* ── TOP ROW (mobile) / ALL COLS (desktop) ── */}

                {/* Number — always visible */}
                <span className="work-num">{item.num}</span>

                {/* Name — always visible, never truncated */}
                <div className="flex items-center min-w-0 flex-1">
                  <h3 className="work-name">
                    <span className="text-roll">
                      <span className="text-roll-row">
                        {item.name.split('').map((letter, i) => (
                          <span key={i} className="text-roll-letter" style={{ '--i': i } as React.CSSProperties}>
                            {letter === ' ' ? '\u00A0' : letter}
                          </span>
                        ))}
                      </span>
                      <span className="text-roll-row text-roll-clone" aria-hidden="true">
                        {item.name.split('').map((letter, i) => (
                          <span key={i} className="text-roll-letter" style={{ '--i': i } as React.CSSProperties}>
                            {letter === ' ' ? '\u00A0' : letter}
                          </span>
                        ))}
                      </span>
                    </span>
                  </h3>
                </div>

                {/* ── META ROW: tag + year + arrow ── */}
                {/* On mobile this sits below the name row; on desktop it's inline */}
                <div className="work-link-meta">
                  <span className="work-tag">{item.tag}</span>
                  <span className="work-year">{item.year}</span>
                  <span className="work-arrow">↗</span>
                </div>
              </a>

              {/* Mobile inline media card */}
              {isMobile && (
                <div className="px-2 pb-6 w-full md:hidden">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-zinc-950 shadow-inner">
                    <WorkMediaMobileCard src={item.mediaUrl} type={item.mediaType} />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop cursor-follow preview */}
      <div ref={previewRef} className="cursor-preview hidden md:block" aria-hidden="true">
        <img ref={imgRef} alt="Case Preview" style={{ display: 'none' }} />
        <video ref={videoRef} style={{ display: 'none' }} />
      </div>
    </section>
  );
}

/* ── MOBILE SCROLL-TRIGGERED AUTOPLAY ── */
function WorkMediaMobileCard({ src, type }: { src: string; type: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (type !== 'video') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) videoRef.current.play().catch(() => { });
          else videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [type]);

  if (type === 'video') {
    return <video ref={videoRef} src={src} muted loop playsInline className="w-full h-full object-cover opacity-80" />;
  }
  return <img src={src} alt="Case study deployment visual asset" className="w-full h-full object-cover opacity-80" />;
}