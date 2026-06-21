'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ContactGateway() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active'>('idle');

  const vapiRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@vapi-ai/web').then((VapiModule) => {
        const VapiConstructor = VapiModule.default || VapiModule;
        try {
          const vapiInstance = new (VapiConstructor as any)('614f3d87-72b9-4df1-b522-87614a774d92');
          vapiRef.current = vapiInstance;

          vapiInstance.on('call-start', () => setCallStatus('active'));
          vapiInstance.on('call-end', () => setCallStatus('idle'));
          vapiInstance.on('error', (err: any) => {
            console.error('Vapi Web Pipeline Error:', err);
            setCallStatus('idle');
          });
        } catch (e) {
          console.error('Vapi instance initialization crash:', e);
        }
      });
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  const handleVoiceCall = async () => {
    if (!vapiRef.current) {
      console.warn('Vapi engine node is not initialized yet.');
      return;
    }

    if (callStatus === 'active') {
      vapiRef.current.stop();
      setCallStatus('idle');
      return;
    }

    try {
      setCallStatus('connecting');
      await vapiRef.current.start('019713f2-b8b1-4a2c-a26a-d20876962264');
    } catch (err) {
      console.error('Failed to patch voice stream node:', err);
      setCallStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "efa8b7ed-c5a6-4272-8a5c-9da83d9b39c3");
    formData.append("subject", "🔥 New Space Digital Intake Briefing Request");
    formData.append("from_name", "Space Digital Conversion Hub");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.message || "Transmission pipeline error. Please try again.");
      }
    } catch (err) {
      console.error("Submission pipeline layout crash:", err);
      alert("Network timeout. Write directly to seth.spacedigitalconsulting@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0B] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-[#FF6B2B] text-xs font-mono tracking-widest uppercase">05 // System Gateway</span>
        <h2 className="text-4xl font-bold tracking-tight text-white mt-4 mb-6">Initiate Strategic Briefing</h2>
        <p className="text-gray-400 text-base max-w-2xl mb-12">
          Experience the automation firsthand. Interact with our active low-latency response channel or submit your operational variables directly below.
        </p>

        <div className="space-y-6">
          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-2xl space-y-5">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${callStatus === 'active' ? 'bg-green-400 animate-pulse' : callStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-[#FF6B2B]'}`} />
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">
                {callStatus === 'active' ? 'Live · Connected to Spacey' : callStatus === 'connecting' ? 'Initializing Agent...' : 'Agent Online · Ready'}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white">Talk to Our AI Agent</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Speak directly with Spacey — our live voice AI. They will qualify your needs and help you figure out if Space Digital is the right fit, in under 3 minutes.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '~1s', label: 'Response latency' },
                { value: 'GPT-4o', label: 'Model' },
                { value: 'Free', label: 'No cost' },
              ].map((stat) => (
                <div key={stat.label} className="bg-black/30 border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-white font-bold text-sm font-mono">{stat.value}</div>
                  <div className="text-gray-500 text-[10px] mt-0.5 font-mono">{stat.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={handleVoiceCall}
              className={`relative z-50 pointer-events-auto w-full py-3.5 rounded-xl font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-200
                ${callStatus === 'active'
                  ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20'
                  : 'bg-[#FF6B2B] text-black hover:bg-[#ff824d]'
                } disabled:opacity-40`}
              disabled={callStatus === 'connecting'}
            >
              {callStatus === 'active' ? '⏹ End Call' : callStatus === 'connecting' ? '⏳ Connecting...' : 'Start Live Demo Call'}
            </button>
            <p className="text-[10px] text-gray-600 font-mono text-center">
              Mic access required · Browser-based · No phone number needed
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-2xl space-y-4">
            <h3 className="text-xl font-semibold text-white">Digital Intake Briefing</h3>

            <AnimatePresence mode="white">
              {!isSubmitted ? (
                <motion.form key="intake-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                      <input type="text" name="name" required placeholder="Your Name" className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-[#FF6B2B] transition-colors text-sm font-sans" />
                    </div>
                    <div className="w-full">
                      <input type="email" name="email" required placeholder="Email Address" className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-[#FF6B2B] transition-colors text-sm font-sans" />
                    </div>
                  </div>

                  <div className="w-full">
                    <input type="text" name="business" required placeholder="Business Type (e.g., HVAC, Clinic, Lawyer)" className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-[#FF6B2B] transition-colors text-sm font-sans" />
                  </div>

                  <div className="w-full">
                    <textarea name="bottlenecks" required rows={4} placeholder="Describe your current missed or repetitive call bottlenecks..." className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-[#FF6B2B] transition-colors text-sm font-sans resize-none leading-relaxed" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-zinc-900 border border-white/10 hover:border-[#FF6B2B] text-white font-medium rounded-xl transition-all duration-200 text-xs font-mono tracking-wider uppercase disabled:opacity-40">
                    {isSubmitting ? 'Transmitting Pipeline Data...' : 'Submit Briefing Data'}
                  </button>
                </motion.form>
              ) : (
                <motion.div key="success-prompt" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-[#FF6B2B]/5 border border-[#FF6B2B]/20 rounded-xl text-center space-y-2">
                  <p className="text-[#FF6B2B] font-semibold text-sm">✓ Briefing Ingested Successfully</p>
                  <p className="text-gray-400 text-xs leading-relaxed max-w-md mx-auto">
                    Your operational metrics have been delivered straight to our team dashboard.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}