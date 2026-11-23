// Terms of Service (English). A draft to be reviewed by a lawyer before launch.
import { COMPANY, LEGAL_UPDATED, SUPPORT_EMAIL } from '../../config/app';
import type { LegalDoc } from './types';

export const terms: LegalDoc = {
  title: 'Terms of Service',
  updated: LEGAL_UPDATED,
  intro: `These terms are an agreement between you and ${COMPANY.name} (“DARDANIC”, “we”, “us”) about using the DARDANIC app. By creating an account or using the app, you agree to them, to our Community Guidelines and to how we handle data as described in our Privacy Policy.`,
  sections: [
    {
      heading: '1. Who can use DARDANIC',
      bullets: [
        'You must be at least 16 years old. FindMe is only for people aged 18 or older.',
        'You must give true information when you sign up, including your date of birth.',
        'You may not use DARDANIC if we have removed your account before, or if the law doesn’t allow you to.',
      ],
    },
    {
      heading: '2. Your account',
      bullets: [
        'You sign in with Apple, Google, or a one-time code sent to your email or phone. Keep access to these safe; you’re responsible for what happens on your account.',
        'Tell us straight away if you think someone else is using your account.',
        'Business accounts must represent a real business, and the person creating one must be allowed to act for it.',
      ],
    },
    {
      heading: '3. Your content',
      paragraphs: [
        'You own the photos, videos, text and other content you share. To run DARDANIC, you give us a worldwide, non-exclusive, royalty-free licence to host, store, copy, show, adapt (for example resize or compress) and distribute your content in the app, only as needed to provide and improve the service. This licence ends when you delete the content or your account, except for copies others have already shared (for example a post someone sent in a message) and backups kept for a limited time.',
        'Only share content you have the right to share, and that follows our Community Guidelines and the law.',
      ],
    },
    {
      heading: '4. Zero tolerance for abuse',
      paragraphs: [
        'We do not tolerate objectionable content or abusive users. You can report content and people from inside the app, and block anyone. We review reports within 24 hours and may remove content, limit features, or suspend or remove accounts that break these terms or the Community Guidelines, with or without notice. If you think we made a mistake, you can ask us to look again.',
      ],
    },
    {
      heading: '5. Marketplace',
      bullets: [
        'Only cars and car-related items may be listed. We may check listings (also automatically) and refuse or remove any listing.',
        'DARDANIC is not a party to any sale. Buyers and sellers deal directly and are fully responsible for the item, the price, payment, delivery and following the law.',
        'Don’t list stolen, counterfeit, illegal or unsafe items, or items you aren’t allowed to sell.',
      ],
    },
    {
      heading: '6. Meets and crews',
      bullets: [
        'Hosts are responsible for their meets, including choosing a legal and safe place and any permits needed.',
        'Taking part in a meet, cruise or event is at your own risk. Follow traffic laws at all times.',
        'Organising or promoting street racing or other illegal driving is not allowed.',
      ],
    },
    {
      heading: '7. FindMe',
      bullets: [
        'FindMe is opt-in and 18+. You can only add plates of vehicles you own or are allowed to use, and we may ask for proof.',
        'Searches are limited, and the owner decides whether to accept a request.',
        'Using FindMe to track, follow, harass or contact someone against their will leads to immediate removal of your account.',
      ],
    },
    {
      heading: '8. Paid plans',
      paragraphs: [
        'Some features (such as the Professional plan for businesses) may cost money. Payments are handled by the App Store or Google Play under their terms, and subscriptions renew automatically until you cancel them in your store account settings. Prices are shown before you buy.',
      ],
    },
    {
      heading: '9. Using the app properly',
      bullets: [
        'Don’t copy, scrape or collect data from DARDANIC, or try to access accounts or systems that aren’t yours.',
        'Don’t interfere with how the app works, or use bots or automated accounts.',
        'Don’t use DARDANIC for anything illegal or to infringe anyone’s rights.',
      ],
    },
    {
      heading: '10. Deleting your account',
      paragraphs: [
        'You can delete your account at any time in Settings → Delete account. Your account is deactivated straight away and permanently deleted after 30 days; if you log in during those 30 days, it is restored. Some information may be kept longer where the law requires it, as explained in the Privacy Policy.',
      ],
    },
    {
      heading: '11. The service',
      paragraphs: [
        'We work hard to keep DARDANIC running well, but it is provided “as is”. We may change, add or remove features, and we can’t promise it will always be available or free of errors. Content from other users, businesses and sellers is theirs; we don’t check it in advance and aren’t responsible for it.',
        'To the extent the law allows, we are not liable for indirect or consequential losses, or for losses caused by other users, meets, or sales between users. Nothing in these terms limits rights you have as a consumer under the law.',
      ],
    },
    {
      heading: '12. Changes to these terms',
      paragraphs: [
        'We may update these terms. If a change is important, we’ll tell you in the app before it takes effect. If you keep using DARDANIC after that, you accept the new terms.',
      ],
    },
    {
      heading: '13. Law and contact',
      paragraphs: [
        'These terms are governed by the laws of the Republic of Kosovo, without affecting mandatory consumer protection laws of the country where you live.',
        `${COMPANY.name}, ${COMPANY.address}. Registration: ${COMPANY.registration}. Email: ${SUPPORT_EMAIL}.`,
      ],
    },
  ],
};
