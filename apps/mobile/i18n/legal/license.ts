// License Agreement (English): the end-user licence for the app itself. A draft to be
// reviewed before launch.
import { COMPANY, LEGAL_UPDATED } from '../../config/app';
import type { LegalDoc } from './types';

export const license: LegalDoc = {
  title: 'License Agreement',
  updated: LEGAL_UPDATED,
  intro: `This agreement covers the DARDANIC app software itself. ${COMPANY.name} gives you a personal, non-exclusive, non-transferable licence to download and use the app on devices you own or control, under these terms and our Terms of Service.`,
  sections: [
    {
      heading: '1. What you may not do',
      bullets: [
        'Copy, change, sell, rent or distribute the app.',
        'Take the app apart, reverse engineer it or try to get its source code, except where the law allows it.',
        'Remove or hide any copyright, trademark or other notices.',
      ],
    },
    {
      heading: '2. App stores',
      paragraphs: [
        'If you downloaded DARDANIC from the App Store or Google Play, this agreement is between you and us, not Apple or Google. They are not responsible for the app or its support. Where you got the app from Apple, Apple’s Standard Licensed Application End User License Agreement also applies, and Apple may enforce this agreement as a third-party beneficiary.',
      ],
    },
    {
      heading: '3. Updates and ending the licence',
      paragraphs: [
        'We may update the app; some updates may be needed to keep using it. This licence ends automatically if you break it or delete your account, and then you must stop using and delete the app.',
      ],
    },
    {
      heading: '4. Everything else',
      paragraphs: [
        'All other rules, including liability and the law that applies, are in our Terms of Service.',
      ],
    },
  ],
};
