'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '3.8×', label: 'Avg ROAS' },
  { value: '67%',  label: 'CPL Reduction' },
  { value: '94%',  label: 'Map Pack Top-3' },
  { value: '82%',  label: 'AI Call Resolution' },
];

export function Sections() {
  // ROI Calculator State
  const [missedCalls, setMissedCalls] = useState(30);
  const [ticketValue, setTicketValue] = useState(150);
  const conversionRate = 0.35; // 35% industry baseline capture rate
  const revenueLost = missedCalls * ticketValue;
  const revenueSaved = Math.round(revenueLost * conversionRate);

  return (
    <div className="bg-[#0A0A0B] text-white overflow-hidden">
      
      {/* ─── 1. ECOSYSTEM SECTION ─── */}
      <section id="ecosystem" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#FF6B2B] text-xs font-mono tracking-widest uppercase">01 // The Core Engine</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">The Connected Growth Pipeline</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Traffic without capture is wasted spend. We construct a dual-engine growth framework: 
              expert customer acquisition funnels paired with instant backend digital execution.
            </p>
            <div className="p-4 border border-white/10 bg-white/[0.02] rounded-xl">
              <p className="text-sm text-gray-400 font-mono">
                <span className="text-[#FF6B2B]">&gt; pipeline_status:</span> Traditional marketing channels (SEO, Ads) are wired straight into live automation nodes, eliminating conversion drop-offs.
              </p>
            </div>
          </div>
          
          {/* Interactive Pipeline Node Mockup */}
          <div className="relative p-8 border border-white/10 bg-black/40 rounded-2xl flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/30">INTELLIGENT_NODE_v1.0</div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-white/[0.03] border border-white/5 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[#FF6B2B] animate-pulse" />
                <span className="text-sm font-mono text-gray-300">Inbound Ad Traffic / SEO Click</span>
              </div>
              <div className="flex justify-center py-1">
                <div className="w-[1px] h-8 bg-gradient-to-bottom from-[#FF6B2B] to-transparent" />
              </div>
              <div className="flex items-center gap-4 p-3 bg-[#FF6B2B]/10 border border-[#FF6B2B]/20 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-sm font-mono text-white font-semibold">Inbound Call Missed (Front Desk Busy)</span>
              </div>
              <div className="flex justify-center py-1">
                <div className="w-[1px] h-8 bg-gradient-to-bottom from-green-500 to-transparent" />
              </div>
              <div className="flex items-center gap-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm font-mono text-gray-200">Vapi Voice Agent Handshake (0.4s Response)</span>
              </div>
            </div>
            <div className="mt-6 text-xs text-center text-gray-500 font-mono">
              [Click "Get In Touch" below to sample the live audio handshake]
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. WORK SECTION ─── */}
      <section id="work" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/10">
        <span className="text-[#FF6B2B] text-xs font-mono tracking-widest uppercase">02 // Validated Proof</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-12">Operational Architecture In Action</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Case Study 1 */}
          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-2xl hover:border-white/20 transition-all group">
            <span className="text-xs font-mono text-gray-500">CLINICAL METRICS</span>
            <h3 className="text-2xl font-bold mt-2 mb-4 group-hover:text-[#FF6B2B] transition-colors">Specialized Medical Clinic</h3>
            <p className="text-gray-400 mb-6">Implemented seamless 24/7 patient booking engine, eliminating manual administrative overloads and stabilizing front-desk retention parameters.</p>
            <div className="flex gap-6 border-t border-white/5 pt-4 font-mono">
              <div><div className="text-lg font-bold text-white">94%</div><div className="text-[10px] text-gray-500">MAP PACK TOP-3</div></div>
              <div><div className="text-lg font-bold text-white">24/7</div><div className="text-[10px] text-gray-500">BOOKING INFRA</div></div>
            </div>
          </div>

          {/* Case Study 2 */}
          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-2xl hover:border-white/20 transition-all group">
            <span className="text-xs font-mono text-gray-500">LOCAL SERVICE INFRASTRUCTURE</span>
            <h3 className="text-2xl font-bold mt-2 mb-4 group-hover:text-[#FF6B2B] transition-colors">HVAC &amp; Specialized Contractors</h3>
            <p className="text-gray-400 mb-6">Captured 42% of previously abandoned after-hours inbound inquiries within 14 days of direct voice automation layer deployment.</p>
            <div className="flex gap-6 border-t border-white/5 pt-4 font-mono">
              <div><div className="text-lg font-bold text-white">67%</div><div className="text-[10px] text-gray-500">CPL REDUCTION</div></div>
              <div><div className="text-lg font-bold text-white">3.8×</div><div className="text-[10px] text-gray-500">DIAGNOSTIC ROAS</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. SYSTEMS (ROI CALCULATOR) SECTION ─── */}
      <section id="systems" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="text-[#FF6B2B] text-xs font-mono tracking-widest uppercase">03 // Financial Infrastructure</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">Quantifiable Operational ROI</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              We engineer enterprise-grade operational infrastructure. Leveraging low-latency voice engines, 
              live calendar sync protocols, and dedicated internal CRM knowledge bases to run your business around the clock.
            </p>
            <div className="space-y-3 font-mono text-sm text-gray-400">
              <div className="flex justify-between p-2 border-b border-white/5"><span>Setup Engine Fee:</span> <span className="text-white font-bold">$1,500 (One-time)</span></div>
              <div className="flex justify-between p-2 border-b border-white/5"><span>Operational Management:</span> <span className="text-white font-bold">$450 / month</span></div>
            </div>
          </div>

          {/* Interactive ROI Slider Application */}
          <div className="p-8 border border-[#FF6B2B]/20 bg-[#FF6B2B]/[0.02] rounded-2xl space-y-6">
            <h3 className="text-xl font-mono font-semibold text-white">Leakage Calculation Terminal</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-gray-400">
                <span>Estimated Monthly Missed Inbound Calls:</span>
                <span className="text-[#FF6B2B] font-bold">{missedCalls}</span>
              </div>
              <input 
                type="range" min="10" max="150" value={missedCalls} 
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full accent-[#FF6B2B] bg-white/10 h-1 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono text-gray-400">
                <span>Average Value of Single Client Deal ($):</span>
                <span className="text-[#FF6B2B] font-bold">${ticketValue}</span>
              </div>
              <input 
                type="range" min="50" max="1000" step="25" value={ticketValue} 
                onChange={(e) => setTicketValue(Number(e.target.value))}
                className="w-full accent-[#FF6B2B] bg-white/10 h-1 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono">
              <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
                <div className="text-[10px] text-gray-500 uppercase">Gross Leaked Revenue</div>
                <div className="text-xl font-bold text-red-400">${revenueLost.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
                <div className="text-[10px] text-gray-500 uppercase">Salvaged via AI Engine</div>
                <div className="text-xl font-bold text-green-400">${revenueSaved.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. ABOUT SECTION ─── */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/10">
        <div className="max-w-3xl">
          <span className="text-[#FF6B2B] text-xs font-mono tracking-widest uppercase">04 // Core Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">Engineered for Scale, Built for Results</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Space Digital bridges the gap between raw marketing traffic and autonomous operations. 
            We engineer custom digital systems that scale predictably, optimize client workflows, 
            and protect local businesses from losing revenue to unanswered phones.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/5">
            <div><div className="text-xs text-gray-500 font-mono mb-1">ENGINE ENGINE</div><div className="text-sm font-medium">Vapi Voice Voice</div></div>
            <div><div className="text-xs text-gray-500 font-mono mb-1">INTEGRATION</div><div className="text-sm font-medium">CRM Webhooks</div></div>
            <div><div className="text-xs text-gray-500 font-mono mb-1">STRATEGY</div><div className="text-sm font-medium">Faceless Execution</div></div>
            <div><div className="text-xs text-gray-500 font-mono mb-1">LOCATION</div><div className="text-sm font-medium">Nairobi, KE</div></div>
          </div>
        </div>
      </section>

    </div>
  );
}