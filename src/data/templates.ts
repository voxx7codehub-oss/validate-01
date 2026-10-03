import { CustomerType, BusinessModelType, StartupProject } from '../types';

export interface IdeaTemplate {
  id: string;
  category: string;
  badge: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  data: {
    startupName: string;
    whatBuilding: string;
    problemSolved: string;
    whoExperiences: string;
    primaryCustomer: string;
    industry: string;
    geography: string;
    customerType: CustomerType;
    solution: string;
    valueProposition: string;
    businessModel: BusinessModelType;
    targetMarket: string;
  };
}

export const STARTER_TEMPLATES: IdeaTemplate[] = [
  {
    id: 'freelance-invoice',
    category: 'AI & Productivity',
    badge: 'Popular',
    icon: 'Receipt',
    name: 'InvoiceFlow AI',
    tagline: 'Autonomous invoicing and payment chasing for freelance designers & devs',
    description: 'Automates tracking billable hours, sending intelligent milestone invoices, and gentle payment reminders via WhatsApp and email.',
    data: {
      startupName: 'InvoiceFlow AI',
      whatBuilding: 'An autonomous micro-invoicing tool for solo freelancers and boutique creative studios that predicts late payments and drafts friendly automated escalation reminders.',
      problemSolved: 'Freelancers spend 4+ unpaid hours every week tracking milestone approvals, chasing overdue client payments, and managing scattered invoice spreadsheets, resulting in delayed cash flow.',
      whoExperiences: 'Solo freelance software engineers, UI/UX designers, and small digital agencies with 1-5 contractors.',
      primaryCustomer: 'Full-time freelancers and independent digital contractors with 3-10 active client retainers.',
      industry: 'Fintech & Freelancer Tools',
      geography: 'Global / North America & Europe',
      customerType: 'B2B SMB',
      solution: 'A zero-setup web app that integrates with Stripe and bank feeds, automatically issues recurring invoices, and uses conversational AI to follow up on late payments without awkward client tension.',
      valueProposition: 'Get paid 12 days faster and eliminate 90% of awkward invoice chasing conversations.',
      businessModel: 'Subscription',
      targetMarket: 'Freelancers, consultants, and micro-studios worldwide billing $40k-$250k annually.',
    },
  },
  {
    id: 'eco-packaging',
    category: 'E-Commerce & Sustainability',
    badge: 'Trending',
    icon: 'Package',
    name: 'EcoPack Direct',
    tagline: 'On-demand custom compostable packaging for Shopify D2C brands',
    description: 'Low-minimum order custom mycelium and seaweed-based shipping mailers with automated carbon offset certification.',
    data: {
      startupName: 'EcoPack Direct',
      whatBuilding: 'A custom sustainable packaging marketplace offering low minimum order quantities (MOQs from 50 units) and instant 3D box mockups for emerging Shopify and Etsy merchants.',
      problemSolved: 'Small sustainable e-commerce brands are forced to buy 5,000+ units upfront from industrial packaging suppliers or use generic plastic bubble mailers that alienate eco-conscious customers.',
      whoExperiences: 'Direct-to-consumer (D2C) founders selling organic apparel, clean cosmetics, and handmade goods.',
      primaryCustomer: 'Small-to-medium e-commerce store owners with $10k-$100k monthly GMV.',
      industry: 'E-Commerce & Sustainable Packaging',
      geography: 'United States & Canada',
      customerType: 'B2B SMB',
      solution: 'An on-demand printing and fulfillment network for certified 100% home-compostable mailers with automated carbon offset badges for Shopify checkout.',
      valueProposition: 'Premium eco-friendly custom branded packaging with zero bulk inventory risk and 48-hour sample turnaround.',
      businessModel: 'Usage-Based',
      targetMarket: 'Over 1.5M independent Shopify & WooCommerce merchants selling conscious consumer goods.',
    },
  },
  {
    id: 'b2b-sales-coach',
    category: 'Sales Tech & AI',
    badge: 'High Demand',
    icon: 'Mic',
    name: 'PitchPulse',
    tagline: 'Real-time objection handling and call intelligence for startup SDRs',
    description: 'A lightweight desktop copilot that listens during live Zoom discovery calls and surfaces customer objection battlecards in under 2 seconds.',
    data: {
      startupName: 'PitchPulse',
      whatBuilding: 'A live audio coaching copilot for early-stage B2B sales reps and founder-led sales that detects buyer hesitation and recommends battle-tested objection responses in real time.',
      problemSolved: 'Junior SDRs and technical founders lose 40% of qualified discovery calls when prospects raise unanticipated competitor comparisons, pricing resistance, or security compliance concerns.',
      whoExperiences: 'Seed to Series A tech founders and newly hired sales development representatives.',
      primaryCustomer: 'B2B SaaS companies with 2-15 sales reps.',
      industry: 'B2B SaaS & Sales Enablement',
      geography: 'Global / English-speaking tech hubs',
      customerType: 'B2B SMB',
      solution: 'A private desktop app that integrates with Zoom and Google Meet, instantly retrieving contextual competitive points and case studies during live customer conversations.',
      valueProposition: 'Increase discovery call to demo conversion by 28% without extensive sales training ramp times.',
      businessModel: 'Subscription',
      targetMarket: 'Early-stage tech startups and mid-market sales teams.',
    },
  },
  {
    id: 'local-artisan-market',
    category: 'Marketplace & Community',
    badge: 'Local First',
    icon: 'ShoppingBag',
    name: 'NeighborhoodCraft',
    tagline: 'Hyperlocal same-day delivery marketplace for artisan bakeries and craft makers',
    description: 'Connects local neighborhood food artisans, coffee roasters, and micro-bakers with suburban households seeking fresh morning delivery.',
    data: {
      startupName: 'NeighborhoodCraft',
      whatBuilding: 'A hyperlocal delivery platform batching morning drops from local home bakers, micro-roasters, and farmers markets to neighborhood clusters.',
      problemSolved: 'Cottage food makers lack delivery logistics to reach customers beyond weekend physical farmers markets, while suburban consumers want fresh artisanal items without driving 40 minutes.',
      whoExperiences: 'Suburban families who love specialty baked goods and independent culinary creators.',
      primaryCustomer: 'Food-loving homeowners aged 28-55 in dense suburban residential zones.',
      industry: 'Hyperlocal Food & E-Commerce',
      geography: 'Metro suburban areas (Austin, Denver, Seattle)',
      customerType: 'B2C',
      solution: 'A consolidated weekly subscription route delivering freshly baked breads, roasted coffees, and jams directly to doorsteps before 8:00 AM every Saturday.',
      valueProposition: 'Taste local farmers market quality at home every weekend with unified delivery fees and zero morning hassle.',
      businessModel: 'Marketplace / Commission',
      targetMarket: 'Suburban households with disposable income seeking artisanal, clean food products.',
    },
  },
];
