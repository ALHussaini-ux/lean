import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LedgerRow {
  time: string;
  source: string;
  status: 'New' | 'Contacted' | 'Visit booked';
}

const LEDGER_SEED: LedgerRow[] = [
  { time: '09:41', source: 'Google Ads', status: 'Contacted' },
  { time: '09:38', source: 'Meta Ads', status: 'New' },
  { time: '09:22', source: 'Referral', status: 'Visit booked' },
];

const LEDGER_SOURCES = ['Google Ads', 'Meta Ads', 'Referral', 'Website'];
const LEDGER_STATUSES: LedgerRow['status'][] = ['New', 'Contacted', 'Visit booked'];

function statusColor(status: LedgerRow['status']) {
  if (status === 'New') return '#E8622C';
  if (status === 'Visit booked') return '#6FA96A';
  return '#9AA3B2';
}

export default function HeroProductWindow() {
  const [ledger, setLedger] = useState<LedgerRow[]>(LEDGER_SEED);
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    const replyTimer = setTimeout(() => setShowReply(true), 1400);
    const interval = setInterval(() => {
      setLedger((prev) => {
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const next: LedgerRow = {
          time,
          source: LEDGER_SOURCES[Math.floor(Math.random() * LEDGER_SOURCES.length)],
          status: LEDGER_STATUSES[Math.floor(Math.random() * LEDGER_STATUSES.length)]
        };
        return [next, ...prev].slice(0, 4);
      });
    }, 4200);
    return () => {
      clearTimeout(replyTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-[560px] mx-auto select-none">
      {/* Browser chrome frame */}
      <div className="rounded-t-[10px] bg-[#12192B] border border-white/10 border-b-0 px-4 py-2.5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <div className="ml-3 flex-1 bg-white/5 rounded px-3 py-1 font-mono text-[10px] text-white/40 tracking-wide">
          app.leansystem.co/leads
        </div>
      </div>

      {/* Window body */}
      <div className="rounded-b-[10px] bg-[#F5F2EA] border border-white/10 border-t-0 grid grid-cols-2 min-h-[300px]">
        {/* Left: live lead ledger */}
        <div className="p-4 border-r border-[#D8D2C4] flex flex-col">
          <span className="font-mono text-[9px] tracking-[0.15em] text-[#8a8477] uppercase mb-3">
            Leads
          </span>
          <div className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {ledger.map((row) => (
                <motion.div
                  key={row.time + row.source + row.status}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-between font-mono text-[10px] bg-white border border-[#E4DFD3] rounded px-2.5 py-2"
                >
                  <span className="text-[#6B7280]">{row.time}</span>
                  <span className="text-[#1C1F26]">{row.source}</span>
                  <span style={{ color: statusColor(row.status) }}>{row.status}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: WhatsApp thread */}
        <div className="p-4 flex flex-col justify-end gap-2 bg-[#EFEBE0]">
          <span className="font-mono text-[9px] tracking-[0.15em] text-[#8a8477] uppercase mb-1">
            WhatsApp
          </span>
          <div className="flex-1 flex flex-col justify-end gap-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="self-start bg-white border border-[#E4DFD3] text-[#1C1F26] text-[11px] px-3 py-1.5 rounded-lg rounded-bl-none max-w-[85%]"
            >
              Hi, interested in the 3BHK layout
            </motion.div>
            <AnimatePresence>
              {showReply && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="self-end bg-[#E8622C] text-white text-[11px] px-3 py-1.5 rounded-lg rounded-br-none max-w-[85%]"
                >
                  Brochure sent. Book a site visit?
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="font-mono text-[9px] text-[#8a8477] text-right">
            replied in 42s
          </span>
        </div>
      </div>
    </div>
  );
}
