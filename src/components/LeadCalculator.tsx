import React, { useState } from 'react';
import { CalculatorState } from '../types';
import { Calculator, TrendingUp, Sparkles, Check, AlertCircle } from 'lucide-react';

export default function LeadCalculator() {
  const [budget, setBudget] = useState(35000); // monthly budget
  const [leadCost, setLeadCost] = useState(400); // cost per lead
  const [commission, setCommission] = useState(150000); // average commission
  const [closeRate, setCloseRate] = useState(1.5); // closing percentage

  // Core metrics calculation
  const totalLeads = Math.floor(budget / leadCost);
  
  // Standard Manual Lead follow up parameters
  const standardCloseRate = closeRate / 100;
  const standardDeals = totalLeads * standardCloseRate;
  const standardRevenue = standardDeals * commission;

  // LEAN Automation boosts closing rate by 2.2x because response time drops to <60s, boosting contact rates
  const leanCloseRate = (closeRate * 2.2) / 100;
  const leanDeals = totalLeads * leanCloseRate;
  const leanRevenue = leanDeals * commission;

  const incrementalRevenue = Math.max(0, leanRevenue - standardRevenue);
  const netLeanGain = Math.max(0, incrementalRevenue - budget);
  const roiMultiplier = budget > 0 ? (leanRevenue / budget).toFixed(1) : '0';

  // Format currency with Indian standards
  const formatINR = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div id="lead-calculator-section" className="bg-brand-dark text-white p-6 md:p-10 rounded-sm border border-neutral-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-brand-orange text-xs tracking-widest font-sans font-bold uppercase inline-block border-b-2 border-brand-orange pb-2 mb-3">
            BUSINESS INTELLIGENCE TOOL
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-tight">
            Calculate Your Automation ROI
          </h2>
          <p className="font-body text-neutral-400 text-sm md:text-base mt-2 max-w-2xl mx-auto">
            Input your current acquisition metrics to see how zero-latency replies and automatic qualification multiply deal flows.
          </p>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Slider Controls (5 Cols) */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 p-6 rounded-sm space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="font-sans font-bold text-xs tracking-wider uppercase text-brand-orange mb-6 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-brand-orange" />
                ACQUISITION METRICS
              </h3>

              <div className="space-y-5">
                {/* Budget Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-sans font-bold text-neutral-400 uppercase tracking-wider">Monthly Ad Budget</span>
                    <span className="font-mono font-bold text-brand-orange">{formatINR(budget)}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="300000"
                    step="5000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-brand-orange h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-600 font-mono">
                    <span>₹10,000</span>
                    <span>₹3,00.000</span>
                  </div>
                </div>

                {/* Lead Cost Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-sans font-bold text-neutral-400 uppercase tracking-wider">Average Cost Per Lead (CPL)</span>
                    <span className="font-mono font-bold text-brand-orange">{formatINR(leadCost)}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={leadCost}
                    onChange={(e) => setLeadCost(Number(e.target.value))}
                    className="w-full accent-brand-orange h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-600 font-mono">
                    <span>₹100</span>
                    <span>₹2,000</span>
                  </div>
                </div>

                {/* Commission Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-sans font-bold text-neutral-400 uppercase tracking-wider">Average Commission per Deal</span>
                    <span className="font-mono font-bold text-brand-orange">{formatINR(commission)}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="25000"
                    value={commission}
                    onChange={(e) => setCommission(Number(e.target.value))}
                    className="w-full accent-brand-orange h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-600 font-mono">
                    <span>₹50,000</span>
                    <span>₹10,00,000</span>
                  </div>
                </div>

                {/* Close Rate Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-sans font-bold text-neutral-400 uppercase tracking-wider">Base Sales Closing Rate</span>
                    <span className="font-mono font-bold text-brand-orange">{closeRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="w-full accent-brand-orange h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-600 font-mono">
                    <span>0.5%</span>
                    <span>5.0%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 p-4 rounded-sm border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-400 leading-relaxed font-body">
              <AlertCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
              <span>
                <strong>Aramco-style calculation metric:</strong> LEAN models assume manual lead contact decays over hours. Our automated sub-60s responses boost raw contact ratios, projecting a conservative <strong>2.2x</strong> scale to close efficiencies.
              </span>
            </div>
          </div>

          {/* ROI Outputs Dashboard (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Top Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-sm">
                <span className="text-[10px] font-sans font-bold text-neutral-500 uppercase tracking-wider block">Raw Monthly Leads</span>
                <span className="text-2xl font-sans font-bold text-white mt-1 block">{totalLeads}</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-sm">
                <span className="text-[10px] font-sans font-bold text-neutral-500 uppercase tracking-wider block">Est. Closing (Manual)</span>
                <span className="text-2xl font-sans font-bold text-neutral-400 mt-1 block">{(standardDeals).toFixed(1)} deals</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-sm col-span-2 md:col-span-1">
                <span className="text-[10px] font-sans font-bold text-brand-orange uppercase tracking-wider block">Est. Closing (LEAN)</span>
                <span className="text-2xl font-sans font-bold text-brand-orange mt-1 block">{(leanDeals).toFixed(1)} deals</span>
              </div>
            </div>

            {/* Main Comparison Block */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-sm flex-1 flex flex-col justify-between">
              
              <div className="space-y-4">
                <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-neutral-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-brand-orange" />
                  REVENUE IMPACT PROJECTION
                </h4>

                <div className="space-y-3.5 pt-2">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                    <span className="text-sm font-body text-neutral-300">Manual Follow-up Gross Commission</span>
                    <span className="font-mono text-sm text-neutral-400">{formatINR(standardRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                    <span className="text-sm font-body text-white font-semibold">LEAN Automated Gross Commission</span>
                    <span className="font-mono text-sm text-white font-bold">{formatINR(leanRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-sans font-bold text-brand-orange">LEAN Incremental Revenue Gained</span>
                    <span className="font-mono text-xl font-extrabold text-brand-orange">{formatINR(incrementalRevenue)}</span>
                  </div>
                </div>
              </div>

              {/* Big Bottom Highlight */}
              <div className="mt-6 pt-5 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="bg-neutral-950 p-4 rounded-sm border border-neutral-800 text-center">
                  <span className="text-[10px] font-sans font-bold text-neutral-500 uppercase tracking-widest block">LEAN NET COMMISSION PROFIT</span>
                  <span className="text-2xl font-sans font-extrabold text-white mt-1 block">{formatINR(netLeanGain)}</span>
                </div>
                <div className="bg-brand-orange/10 p-4 rounded-sm border border-brand-orange/20 text-center">
                  <span className="text-[10px] font-sans font-bold text-brand-orange uppercase tracking-widest block">PROJECTED INVESTMENT MULTIPLIER</span>
                  <span className="text-3xl font-sans font-extrabold text-brand-orange mt-1 block">{roiMultiplier}x ROI</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
