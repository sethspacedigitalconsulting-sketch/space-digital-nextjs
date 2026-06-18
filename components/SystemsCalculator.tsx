'use client';
import { useState } from 'react';

export function SystemsCalculator() {
  const [missedCalls, setMissedCalls] = useState(30);
  const [ticketValue, setTicketValue] = useState(150);
  const conversionRate = 0.35; // 35% standard baseline capture rate
  const revenueLost = missedCalls * ticketValue;
  const revenueSaved = Math.round(revenueLost * conversionRate);

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[#FF6B2B] text-xs font-mono tracking-widest uppercase">03 // Financial Infrastructure</span>
          <h2 className="text-4xl font-bold tracking-tight mt-4 mb-6 text-white">Quantifiable Operational ROI</h2>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            We engineer enterprise-grade operational infrastructure. Leveraging low-latency voice engines, 
            live calendar sync protocols, and dedicated internal CRM knowledge bases to run your business around the clock.
          </p>
          <div className="space-y-3 font-mono text-xs text-gray-400">
            <div className="flex justify-between p-2 border-b border-white/5"><span>Setup Engine Fee:</span> <span className="text-white font-bold">$1,500 (One-time)</span></div>
            <div className="flex justify-between p-2 border-b border-white/5"><span>Operational Management:</span> <span className="text-white font-bold">$450 / month</span></div>
          </div>
        </div>

        <div className="p-8 border border-[#FF6B2B]/20 bg-[#FF6B2B]/[0.02] rounded-2xl space-y-6">
          <h3 className="text-lg font-mono font-semibold text-white">Leakage Calculation Terminal</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-gray-400">
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
            <div className="flex justify-between text-xs font-mono text-gray-400">
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
              <div className="text-[10px] text-gray-400 uppercase">Gross Leaked Revenue</div>
              <div className="text-lg font-bold text-red-400">${revenueLost.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
              <div className="text-[10px] text-gray-400 uppercase">Salvaged via AI Engine</div>
              <div className="text-xl font-bold text-green-400">${revenueSaved.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}