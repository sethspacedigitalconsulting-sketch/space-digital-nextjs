'use client';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#0A0A0B] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-[#FF6B2B] text-xs font-mono tracking-widest uppercase">05 // System Gateway</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">Initiate Strategic Briefing</h2>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Experience the automation firsthand. Secure a strategic consult instantly on our grid, 
          or interact with our active response channel below.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Real-time Live Interaction Channels */}
          <div className="space-y-6">
            <div className="p-8 border border-white/10 bg-white/[0.01] rounded-2xl space-y-4">
              <h3 className="text-xl font-semibold">Live System Auditing</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Want to stress test our low-latency voice engine layout right now? Connect with an active deployment node to witness lead qualification processing in real-time.
              </p>
              <div className="pt-4 space-y-3">
                <a 
                  href="tel:+254700000000" // Replace with your active Vapi pipeline forwarding phone number
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#FF6B2B] text-black font-semibold rounded-xl hover:bg-[#ff824d] transition-colors font-mono text-sm"
                >
                  ⚡ Trigger Live Voice Assistant Simulation
                </a>
                <div className="text-center text-[11px] text-gray-500 font-mono">
                  Standard response latency: &lt; 400ms across network routing.
                </div>
              </div>
            </div>

            <div className="p-6 border border-white/5 bg-black/40 rounded-xl space-y-2 font-mono text-xs text-gray-500">
              <div><span className="text-[#FF6B2B]">Direct Consulting:</span> seth.spacedigitalconsulting@gmail.com</div>
              <div><span className="text-[#FF6B2B]">Portfolio Gateway:</span> hoobe.co/spacedigital (Attached)</div>
            </div>
          </div>

          {/* Right Side: Clean Embed Container placeholder for Calendly Component */}
          <div className="border border-white/10 bg-white/[0.01] rounded-2xl p-4 h-[450px] relative overflow-hidden flex flex-col justify-between">
            <div className="w-full h-full rounded-xl bg-black/40 flex items-center justify-center border border-white/5">
              {/* Clean fallback text pattern until you copy paste your standard iframe script from Calendly dashboard */}
              <div className="text-center space-y-3 px-6">
                <div className="text-sm font-mono text-gray-400">[ Secure Calendar Node Connection ]</div>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Embed your active Calendly inline widget layout script here to secure bookings seamlessly.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}