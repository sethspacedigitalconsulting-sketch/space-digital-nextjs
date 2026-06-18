'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuBarProps {
  active?: 'dashboard' | 'notifications' | 'settings' | 'help' | 'security';
  onSelect?: (key: 'dashboard' | 'notifications' | 'settings' | 'help' | 'security') => void;
}

const icons = {
  dashboard: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path d="M3 9.5L12 4l9 5.5v7.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/>
      <path d="M9 22V12h6v10"/>
    </svg>
  ),
  notifications: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  settings: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  help: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 3-3 3"/>
      <circle cx="12" cy="17" r="1"/>
    </svg>
  ),
  security: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
};

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, active, onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const tooltipTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const isExpanded = hovered || active;

  const handleMobileTooltip = (e: React.MouseEvent) => {
    if (window.innerWidth < 640) {
      e.preventDefault();
      setShowTooltip(true);
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
      tooltipTimeout.current = setTimeout(() => setShowTooltip(false), 1200);
    }
    if (onClick) onClick();
  };

  React.useEffect(() => () => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleMobileTooltip}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center h-11 rounded-xl transition-colors focus:outline-none relative overflow-visible select-none z-10
        ${active 
          ? 'text-white font-semibold' 
          : 'text-zinc-400 hover:text-white'
        }
        w-11 sm:w-auto px-0 sm:px-4 justify-center sm:justify-start bg-transparent
      `}
      style={{ minWidth: 44 }}
    >
      {/* ── Background Sliding Pill Animation ── */}
      {active && (
        <motion.div
          layoutId="activeGlowPill"
          className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-xl -z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}

      {/* ── Hover Light Capsule Animation ── */}
      {hovered && !active && (
        <motion.div
          layoutId="hoverGlowPill"
          className="absolute inset-0 bg-white/[0.03] border border-white/[0.05] rounded-xl -z-10"
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        />
      )}

      {/* Mobile Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.span
            initial={{ opacity: 0, y: 4, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2 }}
            className="sm:hidden absolute -top-8 left-1/2 bg-zinc-900 border border-zinc-800 text-white text-[11px] font-mono rounded px-2 py-0.5 shadow-xl pointer-events-none z-30"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Icon Frame */}
      <span className="flex items-center justify-center w-5 h-5 z-20 flex-shrink-0">
        {icon}
      </span>

      {/* Fluid Width Text Expansion Block */}
      <motion.span
        className="text-xs tracking-tight hidden sm:inline-block font-sans overflow-hidden whitespace-nowrap ml-0 z-20"
        initial={false}
        animate={{
          width: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
          marginLeft: isExpanded ? 8 : 0
        }}
        transition={{
          width: { type: 'spring', stiffness: 320, damping: 28 },
          opacity: { duration: 0.15, delay: isExpanded ? 0.05 : 0 }
        }}
      >
        {label}
      </motion.span>
    </button>
  );
};

export const MenuBar = ({ active = 'dashboard', onSelect }: MenuBarProps) => {
  return (
    <nav className="flex items-center gap-1.5 bg-[#0A0A0B]/80 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 w-fit mx-auto shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)]">
      <IconButton icon={icons.dashboard} label="Dashboard" active={active === 'dashboard'} onClick={() => onSelect?.('dashboard')} />
      <div className="w-[1px] h-5 bg-white/10 mx-1 flex-shrink-0" />
      <IconButton icon={icons.notifications} label="Notifications" active={active === 'notifications'} onClick={() => onSelect?.('notifications')} />
      <IconButton icon={icons.settings} label="Settings" active={active === 'settings'} onClick={() => onSelect?.('settings')} />
      <IconButton icon={icons.help} label="Help" active={active === 'help'} onClick={() => onSelect?.('help')} />
      <IconButton icon={icons.security} label="Security" active={active === 'security'} onClick={() => onSelect?.('security')} />
    </nav>
  );
};