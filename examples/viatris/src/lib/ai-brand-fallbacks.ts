/** Used when Experience Edge has no AI summary item (local dev / empty tenant). */
export const IA_SUMMARY_FALLBACK = {
  title: 'Viatris',
  description:
    'Viatris is a global healthcare company empowering people worldwide to live healthier at every stage of life. Built with Sitecore XM Cloud and Next.js, this demo showcases branded content, search, and article experiences.',
} as const;

export const IA_SERVICES_FALLBACK = [
  {
    category: 'Products',
    name: 'Medicines and therapies',
    description:
      'Explore medicines across cardiovascular, oncology, and other therapeutic areas with information for patients and healthcare professionals.',
  },
  {
    category: 'Impact',
    name: 'Access and sustainability',
    description:
      'Learn how Viatris advances access to quality medicine and supports healthier communities globally.',
  },
  {
    category: 'About',
    name: 'Company and leadership',
    description:
      'Discover Viatris mission, global footprint, and commitment to sustainable healthcare access.',
  },
] as const;

export const IA_FAQ_FALLBACK = [
  {
    question: 'How do I contact Viatris?',
    answer:
      'Use the Contact link in the header or visit viatris.com/contact for regional office and media inquiries.',
  },
  {
    question: 'Where can I find product information?',
    answer:
      'Visit the Products section on viatris.com or speak with your healthcare provider for prescribing information.',
  },
  {
    question: 'What does Viatris do?',
    answer:
      'Viatris develops, manufactures, and distributes medicines to patients in more than 165 countries and territories.',
  },
  {
    question: 'Is content available in multiple languages?',
    answer:
      'The public site supports configured locales in Sitecore; locale routing follows your XM Cloud language setup.',
  },
] as const;
