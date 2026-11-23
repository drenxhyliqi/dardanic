// Sample conversations for the Messages UI (made up). Messages are oldest first.
// `from: 'me'` is you; otherwise the sender's username.
import type { FeedAuthor } from './feed';
import {
  ardit, besnik, blerim, detailPro, drita, e46Crew, granit, IMG, jeta, leon, lira,
  photo, storyPhoto, vesa,
} from './feedAuthors';

export type Message = {
  id: string;
  from: string; // 'me' or a username
  minutesAgo: number;
  text?: string;
  photo?: string;
  postId?: string; // a shared feed post
  meetId?: string; // a shared meet
  listingId?: string; // a shared Marketplace listing
  story?: string; // photo of the story this replies to
  flamedByThem?: boolean; // the other person flamed this message
  flamedByMe?: boolean;
};

export type Conversation = {
  id: string;
  kind: 'direct' | 'crew';
  title: string; // person's username or the crew's name
  members: FeedAuthor[]; // everyone except you
  memberCount?: number; // crews: total members
  activeMinutesAgo?: number; // direct: last seen online
  unread: number;
  muted?: boolean;
  typing?: string; // username typing right now
  seen?: boolean; // they've seen your last message
  request?: 'profile'; // a message request from someone you don't follow
  outgoingRequest?: boolean; // you messaged a private account you don't both follow
  messages: Message[];
};

const m = (id: string, from: string, minutesAgo: number, rest: Partial<Message> = {}): Message => ({
  id, from, minutesAgo, ...rest,
});

export const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: 'leon', kind: 'direct', title: leon.username, members: [leon], activeMinutesAgo: 2,
    unread: 2,
    messages: [
      m('l1', 'me', 1500, { text: 'Vlla, RS6 duket e çmendur pas ceramic-ut' }),
      m('l2', leon.username, 1490, { text: 'Faleminderit! E bëri Detail Pro 🙌', flamedByMe: true }),
      m('l3', 'me', 1485, { postId: 'p4' }),
      m('l4', 'me', 1484, { text: 'Rugovë të dielën?' }),
      m('l5', leon.username, 1400, { text: 'Këtë javë s’mundem, tjetrën patjetër' }),
      m('l6', leon.username, 14, { photo: photo(IMG.rs6) }),
      m('l7', leon.username, 12, { text: 'E pashë E46-in tënd te Gërmia 🔥', flamedByThem: false }),
    ],
  },
  {
    id: 'e46', kind: 'crew', title: e46Crew.name, members: [granit, ardit, blerim, leon],
    memberCount: 24, unread: 5, typing: granit.username,
    messages: [
      m('e1', ardit.username, 300, { text: 'Kush po vjen sonte?' }),
      m('e2', 'me', 290, { text: 'Jam brenda, po e marr 330Ci-në' }),
      m('e3', blerim.username, 285, { text: 'Edhe unë, shihemi në 21:00' }),
      m('e4', blerim.username, 284, { meetId: 'p3' }),
      m('e5', granit.username, 60, { text: 'Parkingu u mbush përgjysmë tashmë 👀' }),
      m('e6', granit.username, 59, { photo: photo(IMG.garage) }),
    ],
  },
  {
    id: 'detailpro', kind: 'direct', title: detailPro.username, members: [detailPro],
    activeMinutesAgo: 30, unread: 1,
    messages: [
      m('d1', 'me', 2900, { text: 'Përshëndetje! A keni termin për ceramic këtë javë?' }),
      m('d2', detailPro.username, 2880, { text: 'Përshëndetje! E enjte në 10:00 shkon. Dy shtresa, 2 ditë.' }),
      m('d3', 'me', 2870, { text: 'Perfekt, rezervoje 🙏' }),
      m('d4', detailPro.username, 65, { text: 'Vetura juaj është gati për t’u marrë ✅' }),
    ],
  },
  {
    id: 'jeta', kind: 'direct', title: jeta.username, members: [jeta], activeMinutesAgo: 180,
    unread: 0, seen: true,
    messages: [
      m('j1', jeta.username, 200, { story: storyPhoto(IMG.rs6), text: 'Kjo ngjyrë 😍' }),
      m('j2', 'me', 190, { text: 'Ceramic i ri! A po vjen në Prishtinë në korrik?' }),
    ],
  },
  {
    id: 'convoy', kind: 'crew', title: 'Kolona e verës 🇽🇰', members: [drita, lira, vesa],
    memberCount: 9, unread: 0, muted: true,
    messages: [
      m('c1', drita.username, 1700, { text: 'Nisemi nga Mynihu më 12, nga Vjena më 13' }),
      m('c2', lira.username, 1690, { text: 'Bashkohem në Vjenë!' }),
      m('c3', 'me', 1680, { text: 'Më numëroni edhe mua për korrik', flamedByThem: true }),
    ],
  },
  {
    id: 'req-besnik', kind: 'direct', title: besnik.username, members: [besnik], unread: 1,
    request: 'profile',
    messages: [m('r2', besnik.username, 600, { text: 'Përshëndetje, a po i shet pjesët e E30 që i postove?' })],
  },
];
