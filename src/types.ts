/**
 * Types and interfaces for LEAN Real Estate Lead Generation & Automation
 */

export type Page = 'home' | 'services' | 'about' | 'blog' | 'contact' | 'get-started';

export interface ServiceCard {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  billing: string;
  tagline: string;
  description: string;
  features: string[];
  typicalResults: string[];
  whoItsFor: string[];
  ctaText: string;
  popular: boolean;
}

export interface SimulatorLead {
  id: string;
  name: string;
  phone: string;
  propertyType: string;
  timestamp: string;
  status: 'incoming' | 'parsed' | 'qualified' | 'automated-reply' | 'booked';
  logs: string[];
}
