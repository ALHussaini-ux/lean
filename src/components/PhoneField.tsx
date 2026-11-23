import { useEffect, useRef, useState } from 'react';
import { COUNTRIES, DEFAULT_COUNTRY, flagOf, guessCountry, matchDialCode } from '../countries';

interface PhoneFieldProps {
  /** Called with the full international number, e.g. "+91 98480 12345" */
  onChange: (value: string) => void;
}

/**
 * Phone input with a compact country-code picker. The picker is a native
 * <select> (good on phones and with screen readers) laid over a small
 * flag + code label so it matches the site's underlined fields.
 */
export default function PhoneField({ onChange }: PhoneFieldProps) {
  const [iso, setIso] = useState(DEFAULT_COUNTRY);
  const [number, setNumber] = useState('');
  const touched = useRef(false);

  // Default to the visitor's own country, unless they've already picked one
  useEffect(() => {
    if (!touched.current) setIso(guessCountry());
  }, []);

  const country = COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0];

  useEffect(() => {
    onChange(number.trim() ? `+${country.dial} ${number.trim()}` : '');
  }, [country.dial, number, onChange]);

  const handleNumber = (raw: string) => {
    // A pasted "+44 7700 900123" picks the country and keeps the rest
    if (raw.trim().startsWith('+')) {
      const match = matchDialCode(raw);
      if (match) {
        touched.current = true;
        setIso(match.country.iso);
        setNumber(match.rest);
        return;
      }
    }
    setNumber(raw.replace(/[^\d\s()-]/g, ''));
  };

  return (
    <div className="block">
      <label htmlFor="phone" className="field-label">
        Phone
      </label>
      <div className="flex items-center border-b border-line transition-colors duration-300 focus-within:border-ink">
        <div className="relative shrink-0">
          <select
            id="phone-country"
            aria-label="Country code"
            value={iso}
            onChange={(e) => {
              touched.current = true;
              setIso(e.target.value);
            }}
            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
          >
            {COUNTRIES.map((c) => (
              <option key={c.iso} value={c.iso}>
                {flagOf(c.iso)} {c.name} (+{c.dial})
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none flex items-center gap-1.5 rounded-sm py-[14px] pb-3 pr-3 text-[16px] tabular-nums text-ink transition-colors peer-hover:text-ink-2 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
          >
            <span className="text-[17px] leading-none">{flagOf(country.iso)}</span>
            <span>+{country.dial}</span>
            <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 text-muted" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <span className="mr-3 h-5 w-px shrink-0 bg-line" aria-hidden="true" />
        <input
          id="phone"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={number}
          onChange={(e) => handleNumber(e.target.value)}
          pattern="[0-9\s()\-]{4,20}"
          title="Enter your phone number without the country code"
          placeholder="Phone number"
          className="min-w-0 flex-1 bg-transparent py-[14px] pb-3 text-[16px] text-ink outline-none placeholder:text-faint"
        />
      </div>
    </div>
  );
}
