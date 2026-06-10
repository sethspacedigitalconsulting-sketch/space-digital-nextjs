'use client';
import { motion } from 'framer-motion';

export function Signature() {
  return (
    <section className="section-border" style={{ padding: '12rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vh',
        background: 'radial-gradient(ellipse at center, rgba(255,107,43,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.p
        className="section-tag"
        initial={{ opacity: 0, y: '2rem' }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
        style={{ marginBottom: '3rem' }}>
        09 — Initiate
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: '3rem', filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }} transition={{ duration: 1, ease: [0.16,1,0.3,1], delay: 0.1 }}
        style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.4rem, 5vw, 5rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.05, maxWidth: '18ch', margin: '0 auto 1.5rem' }}>
        Tailored with<br />absolute precision.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: '2rem' }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.22 }}
        style={{ fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '34ch', margin: '0 auto 4rem', fontFamily: 'var(--sans)' }}>
        Every engagement begins with a briefing. No templates. No assumptions. Just a precise diagnosis of where you are and a system engineered to get you where you need to be.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: '2rem' }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.32 }}
        style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href="mailto:seth.spacedigitalconsulting@gmail.com"
          className="btn btn-accent"
          style={{ cursor: 'none' }}>
          Initiate a Briefing
        </a>
        <a
          href="mailto:seth.spacedigitalconsulting@gmail.com"
          className="btn"
          style={{ cursor: 'none' }}>
          seth.spacedigitalconsulting@gmail.com
        </a>
      </motion.div>
    </section>
  );
}
