import React, { useState } from 'react';
import { Check, MessageSquare, Mail, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AramcoButton from './AramcoButton';

export default function LeadPortal() {
  // Form fields state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Apartments');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    setSubmitted(true);
  };

  return (
    <div id="lead-portal" className="max-w-6xl mx-auto px-6">
      
      <div className="text-center mb-12 space-y-3">
        <span className="text-brand-orange text-xs tracking-widest font-sans font-bold uppercase inline-block border-b-2 border-brand-orange pb-2 mb-2">
          GET STARTED
        </span>
        <h2 className="text-3xl md:text-4xl font-sans font-black text-brand-dark tracking-tight">
          Ready to Generate More Leads?
        </h2>
        <p className="font-body text-brand-gray text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Schedule a quick call to discuss your project and find the right tier for your goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Options Column (5 columns on large screens) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xs font-sans font-bold text-neutral-400 tracking-widest uppercase mb-4 block">
            DIRECT CONTACT OPTIONS
          </h3>

          {/* Option 1: WhatsApp */}
          <div className="bg-white border border-neutral-200 p-5 rounded-sm hover:border-brand-orange transition-all duration-300 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="space-y-2 flex-grow">
              <span className="text-[10px] font-sans font-bold tracking-wider text-neutral-400 block uppercase">OPTION 1</span>
              <h4 className="font-sans font-bold text-base text-brand-navy">Contact via WhatsApp</h4>
              <p className="font-body text-neutral-500 text-xs">
                Text us directly with your project description. Usually responds within 1 hour.
              </p>
              <div className="pt-2">
                <a 
                  href="https://wa.me/919121294949?text=Hello%20LEAN,%20I'm%20interested%20in%20your%20real%20estate%20growth%20systems."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-sans font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider"
                >
                  Text us: +91 91212 94949
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Option 2: Email */}
          <div className="bg-white border border-neutral-200 p-5 rounded-sm hover:border-brand-orange transition-all duration-300 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="space-y-2 flex-grow">
              <span className="text-[10px] font-sans font-bold tracking-wider text-neutral-400 block uppercase">OPTION 2</span>
              <h4 className="font-sans font-bold text-base text-brand-navy">Direct Email Inquiry</h4>
              <p className="font-body text-neutral-500 text-xs">
                Send us your briefs, layouts, or project files. We respond within 24 hours.
              </p>
              <div className="pt-2">
                <a 
                  href="mailto:hello@leanscale.co"
                  className="inline-flex items-center gap-2 text-xs font-sans font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider"
                >
                  hello@leanscale.co
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Option 3: Calendar Booking */}
          <div className="bg-white border border-neutral-200 p-5 rounded-sm hover:border-brand-orange transition-all duration-300 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="space-y-2 flex-grow">
              <span className="text-[10px] font-sans font-bold tracking-wider text-neutral-400 block uppercase">OPTION 3</span>
              <h4 className="font-sans font-bold text-base text-brand-navy">Calendar Booking</h4>
              <p className="font-body text-neutral-500 text-xs">
                Instantly schedule a 30-minute free growth consultation call with our pipeline architect.
              </p>
              <div className="pt-2">
                <a 
                  href="https://calendly.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-sans font-bold text-brand-orange hover:text-orange-600 transition-colors uppercase tracking-wider"
                >
                  Book 30-min Consultation
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form Column (7 columns on large screens) */}
        <div className="lg:col-span-7 bg-brand-light p-6 md:p-8 rounded-sm border border-neutral-200 shadow-sm">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-base font-sans font-bold text-brand-dark mb-1">
                    Option 4: Quick Contact Form
                  </h3>
                  <p className="text-xs font-body text-neutral-500">
                    Submit your basic project parameters and we will contact you directly within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-sans font-bold text-neutral-600 uppercase tracking-wider block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:border-brand-orange px-3.5 py-2.5 text-xs rounded-sm text-brand-dark focus:outline-none font-body transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-sans font-bold text-neutral-600 uppercase tracking-wider block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:border-brand-orange px-3.5 py-2.5 text-xs rounded-sm text-brand-dark focus:outline-none font-body transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-sans font-bold text-neutral-600 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@realty.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-neutral-200 focus:border-brand-orange px-3.5 py-2.5 text-xs rounded-sm text-brand-dark focus:outline-none font-body transition-colors"
                    />
                  </div>

                  {/* Project Type Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-sans font-bold text-neutral-600 uppercase tracking-wider block">
                      Project Type
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-white border border-neutral-200 focus:border-brand-orange px-3 py-2.5 text-xs rounded-sm text-brand-dark focus:outline-none font-body transition-colors cursor-pointer"
                    >
                      <option value="Apartments">Apartments</option>
                      <option value="Villas">Villas</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-sans font-bold text-neutral-600 uppercase tracking-wider block">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us briefly about your project location, pricing, or targets..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-neutral-200 focus:border-brand-orange px-3.5 py-2.5 text-xs rounded-sm text-brand-dark focus:outline-none font-body transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <AramcoButton
                      type="submit"
                      variant="orange"
                      className="w-full justify-between rounded-sm"
                    >
                      Submit Enquiry
                    </AramcoButton>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="thank-you-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                
                 <div className="space-y-2">
                  <h3 className="font-sans font-black text-2xl text-brand-dark">Enquiry Submitted</h3>
                  <p className="font-body text-neutral-600 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you! We have received your request. Our real estate growth integration team will get in touch with you within 24 hours to schedule your strategy call.
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="text-xs font-sans font-bold text-neutral-400 hover:text-brand-dark transition-colors uppercase tracking-wider"
                  >
                    Submit another request
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
