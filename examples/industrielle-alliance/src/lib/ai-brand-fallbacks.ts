/** Used when Experience Edge has no AI summary item (local dev / empty tenant). */
export const IA_SUMMARY_FALLBACK = {
  title: 'iA Financial Group',
  description:
    'iA Financial Group offers insurance, savings and retirement, and wealth management for individuals and businesses. Built with Sitecore XM Cloud and Next.js, the experience supports personalized service discovery, advisor search, and secure client resources.',
} as const;

export const IA_SERVICES_FALLBACK = [
  {
    category: 'Insurance',
    name: 'Personal and business coverage',
    description:
      'Explore car, home, life, and specialty insurance products, and connect with an advisor for a tailored recommendation.',
  },
  {
    category: 'Savings and retirement',
    name: 'Savings and retirement planning',
    description:
      'Calculate needs, compare registered plans, and access tools to plan income in retirement with guidance from iA specialists.',
  },
  {
    category: 'Wealth management',
    name: 'Wealth and investment solutions',
    description:
      'Access discretionary and advisory portfolios, wealth transfer strategies, and private client services aligned to your goals.',
  },
] as const;

export const IA_FAQ_FALLBACK = [
  {
    question: 'How do I sign in to my client account?',
    answer:
      'Use the Sign in action on the homepage or client panel, choose your product line, and authenticate with your existing credentials. If you need access, contact your advisor or iA client services.',
  },
  {
    question: 'How do I find an advisor?',
    answer:
      'Use the Find an advisor call-to-action on the homepage to search by location and specialty, or browse the wealth management section for contact options.',
  },
  {
    question: 'Where can I make a claim?',
    answer:
      'Clients can start a claim from the client panel or the insurance section. Have your policy number ready and follow the guided steps; an iA representative may follow up for details.',
  },
  {
    question: 'Is content available in French and English?',
    answer:
      'The public site supports Canadian English and French where configured in Sitecore; locale routing follows your XM Cloud language setup.',
  },
] as const;
