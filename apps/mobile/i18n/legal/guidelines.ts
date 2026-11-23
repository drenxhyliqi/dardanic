// Community Guidelines (English). A draft to be reviewed before launch.
import { LEGAL_UPDATED } from '../../config/app';
import type { LegalDoc } from './types';

export const guidelines: LegalDoc = {
  title: 'Community Guidelines',
  updated: LEGAL_UPDATED,
  intro:
    'DARDANIC is a place for car culture in Kosovo and the Albanian diaspora. These guidelines keep it friendly, safe and about cars. They apply to everything you share: posts, stories, comments, messages, listings, meets, crews and FindMe. We have zero tolerance for abusive content and abusive users.',
  sections: [
    {
      heading: 'Respect people',
      bullets: [
        'No bullying, harassment, threats or intimidation, in public or in messages.',
        'No hate speech or hateful symbols based on ethnicity, nationality, religion, gender, sexual orientation, disability or any other protected trait.',
        'Disagree about cars all you want, but go after the build, not the person.',
      ],
    },
    {
      heading: 'Keep it about cars',
      bullets: [
        'Share cars, builds, parts, meets, road trips, motorsport and the people who make car culture what it is.',
        'Spam, misleading links, fake giveaways and mass unsolicited messages aren’t allowed.',
        'The Marketplace is for cars, parts, wheels, tools, car electronics and accessories only.',
      ],
    },
    {
      heading: 'Drive safe',
      bullets: [
        'Don’t post, promote or organise street racing, drifting or stunts on public roads.',
        'Don’t share content that encourages dangerous or illegal driving, such as extreme speeding, driving under the influence or using a phone while driving.',
        'Track days, closed-course events and legal motorsport are welcome.',
      ],
    },
    {
      heading: 'No adult, violent or illegal content',
      bullets: [
        'No nudity or sexual content.',
        'No graphic violence, and nothing that sexualises or endangers anyone under 18. We report child safety issues to the authorities.',
        'No selling or promoting stolen cars or parts, fake documents or plates, weapons, drugs or anything else illegal.',
        'No modifications or services that are illegal where you are, such as removing emission systems where that’s against the law.',
      ],
    },
    {
      heading: 'Be real',
      bullets: [
        'Use your own identity. Don’t pretend to be another person, crew or business.',
        'Businesses must show who they are and describe their services honestly.',
        'Don’t buy, sell or fake followers, flames or comments.',
      ],
    },
    {
      heading: 'Respect privacy',
      bullets: [
        'Don’t share other people’s personal details, such as addresses, phone numbers or private messages, without their permission.',
        'FindMe is opt-in and 18+. Only use it to connect with drivers who chose to be found. Never use plates to track, follow or harass anyone.',
        'Think before posting other people’s plates and faces. Blur them if they didn’t agree to be shown.',
      ],
    },
    {
      heading: 'Buy and sell honestly',
      bullets: [
        'Describe items and cars truthfully, with real photos and a real price.',
        'Meet in public places, check items before paying, and never ask for or pay deposits to strangers.',
        'DARDANIC isn’t part of any sale. You are responsible for what you buy and sell.',
      ],
    },
    {
      heading: 'Meets',
      bullets: [
        'Hosts describe their meets honestly and choose legal, safe places.',
        'At meets: respect neighbours, residents and the police, keep the noise down and leave the place cleaner than you found it.',
      ],
    },
    {
      heading: 'Reporting',
      paragraphs: [
        'If you see something that breaks these guidelines, tap ••• on it (or hold a comment or message) and choose Report. Reports are anonymous. We review them within 24 hours. You can also block anyone at any time. If someone is in immediate danger, call 112.',
      ],
    },
    {
      heading: 'What happens if you break the rules',
      paragraphs: [
        'Depending on how serious it is, we may remove the content, limit features, temporarily suspend the account or permanently remove it. Serious violations, such as threats, child safety issues or illegal sales, lead to immediate removal and may be reported to the authorities. If you think we made a mistake, contact us through Settings → Help & support.',
      ],
    },
  ],
};
