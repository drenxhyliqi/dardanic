// Privacy Policy (English). A draft to be reviewed by a lawyer before launch.
// The services listed under "Who we share it with" are the ones planned for the
// backend (Supabase, Cloudflare, Apple / Google sign-in, an SMS provider, PostHog,
// Sentry); update the list if that changes.
import { COMPANY, LEGAL_UPDATED, PRIVACY_EMAIL } from '../../config/app';
import type { LegalDoc } from './types';

export const privacy: LegalDoc = {
  title: 'Privacy Policy',
  updated: LEGAL_UPDATED,
  intro: `This policy explains what personal data DARDANIC collects, why, who we share it with and the choices you have. ${COMPANY.name} (${COMPANY.address}) is responsible for your data. We follow Kosovo’s law on the protection of personal data and, for people in the EU and EEA, the General Data Protection Regulation (GDPR).`,
  sections: [
    {
      heading: '1. What we collect',
      bullets: [
        'Account details: your email or phone number, or your Apple / Google sign-in, plus your username, display name and date of birth (used to check your age, never shown on your profile).',
        'Profile and content: your photo, banner, bio, city, vibes, garage and builds, posts, stories, comments, flames, messages, listings, meets and crews.',
        'FindMe (only if you turn it on): your plates, vehicle details and the proof of ownership you upload.',
        'Location you choose to add, such as a city on your profile or a place on a story or meet. We don’t track your location in the background.',
        'Camera, microphone and photos: only what you choose to take or pick, when you allow access.',
        'Safety: reports you send, blocks, and reports about your account.',
        'Device and usage: app version, device type, crash reports and how features are used, to fix problems and improve the app.',
      ],
    },
    {
      heading: '2. Why we use it',
      bullets: [
        'To run DARDANIC and give you the features you ask for (our agreement with you).',
        'To keep the community safe: checking ages, reviewing reports, preventing spam, fraud and abuse (our legitimate interest in a safe service, and legal duties).',
        'To show you relevant content, such as posts matching your vibes or listings near you (legitimate interest; you can change your vibes at any time).',
        'To send notifications you can switch off in your phone settings.',
        'To meet legal obligations, such as answering lawful requests from authorities.',
      ],
      closing: [
        'We don’t sell your personal data, and we don’t use it for advertising from other companies.',
      ],
    },
    {
      heading: '3. What other people see',
      bullets: [
        'Your username, display name, photo and bio are public. Public accounts show posts to everyone; private accounts only to followers you approve.',
        'Your date of birth, email, phone number and FindMe plates are never shown to others. A FindMe search only shows a small card, and the owner decides whether to connect.',
        'Messages are only visible to the people in the chat.',
      ],
    },
    {
      heading: '4. Who we share it with',
      paragraphs: [
        'We only share data with service providers that help us run DARDANIC, under contracts that protect it: hosting and database (Supabase), image and video storage (Cloudflare), sign-in (Apple, Google), text messages for codes (an SMS provider), app analytics (PostHog) and crash reports (Sentry). We may also share data when the law requires it, or to protect people from harm.',
        'Some providers may process data outside Kosovo and the EU. When they do, we use safeguards such as the European Commission’s standard contractual clauses.',
      ],
    },
    {
      heading: '5. How long we keep it',
      bullets: [
        'While your account exists. When you delete it, everything is permanently deleted after the 30-day grace period.',
        'Content you delete is removed from the app straight away and from backups within 30 days.',
        'Reports and safety records may be kept longer when needed to prevent abuse or as the law requires.',
      ],
    },
    {
      heading: '6. Your rights',
      paragraphs: [
        `You can see, correct, download or delete your data, object to or limit how we use it, and withdraw any consent you gave. You can do much of this in the app (edit your profile, Settings, Delete account) or by emailing ${PRIVACY_EMAIL}. We answer within one month. You can also complain to the Information and Privacy Agency of Kosovo, or the data protection authority where you live in the EU / EEA.`,
      ],
    },
    {
      heading: '7. Age',
      paragraphs: [
        'DARDANIC is for people aged 16 and older, and FindMe for 18 and older. If we learn that someone younger has an account, we delete it.',
      ],
    },
    {
      heading: '8. Security',
      paragraphs: [
        'We protect your data with encryption in transit, access controls and regular reviews. No system is completely secure, so please tell us straight away if you notice anything suspicious.',
      ],
    },
    {
      heading: '9. Changes and contact',
      paragraphs: [
        `We’ll tell you in the app before important changes to this policy. Questions or requests: ${PRIVACY_EMAIL}, or write to ${COMPANY.name}, ${COMPANY.address}.`,
      ],
    },
  ],
};
