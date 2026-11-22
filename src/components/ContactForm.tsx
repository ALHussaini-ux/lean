import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from './ui';
import { EASE } from '../lib/motion';

export const CONTACT_EMAIL = 'hello@leansystem.co';

const PROJECT_TYPES = ['Apartments', 'Villas', 'Plots', 'Commercial', 'Something else'];

/**
 * Sends the enquiry by opening the visitor's email app with everything pre-filled.
 * To receive enquiries without the email step, point `handleSubmit` at a form
 * backend (Formspree, a Vercel function, your CRM's webhook, etc.).
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: PROJECT_TYPES[0], message: '' });
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New enquiry: ${form.name} (${form.type})`;
    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Project type: ${form.type}`,
      '',
      form.message,
    ].join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!sent ? (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2"
        >
          <label className="block">
            <span className="field-label">Your name</span>
            <input required className="field" value={form.name} onChange={update('name')} autoComplete="name" />
          </label>
          <label className="block">
            <span className="field-label">Phone</span>
            <input required type="tel" className="field" value={form.phone} onChange={update('phone')} autoComplete="tel" placeholder="+91" />
          </label>
          <label className="block">
            <span className="field-label">Email</span>
            <input required type="email" className="field" value={form.email} onChange={update('email')} autoComplete="email" />
          </label>
          <label className="block">
            <span className="field-label">Project type</span>
            <select className="field cursor-pointer appearance-none" value={form.type} onChange={update('type')}>
              {PROJECT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="field-label">Tell us about the project</span>
            <textarea
              rows={3}
              className="field resize-none"
              value={form.message}
              onChange={update('message')}
              placeholder="Location, number of units, launch date, current marketing…"
            />
          </label>
          <div className="sm:col-span-2 flex flex-col-reverse gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-muted">We reply within one working day.</p>
            <Button type="submit">Send enquiry</Button>
          </div>
        </motion.form>
      ) : (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="py-6"
        >
          <p className="text-[28px] font-medium tracking-[-0.02em]">Thanks, {form.name.split(' ')[0] || 'there'}.</p>
          <p className="mt-3 max-w-md text-muted leading-relaxed">
            Your email app should have opened with your details filled in. Just hit send. If nothing opened, write to us directly at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline underline-offset-4">{CONTACT_EMAIL}</a>.
          </p>
          <button type="button" onClick={() => setSent(false)} className="mt-6 text-[14px] text-muted hover:text-ink">
            ← Back to the form
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
