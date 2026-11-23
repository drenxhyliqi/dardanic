// Sample comment threads for a few feed posts (made up). Replies nest: each comment
// can have replies, which can have replies of their own. Posts not listed here start
// with no comments.
import type { FeedAuthor } from './feed';
import {
  alignPro, ardit, besnik, blerim, detailPro, drita, era, fatos, granit, jeta, leon, lira,
  tuneGarage, vesa,
} from './feedAuthors';

export type Comment = {
  id: string;
  author: FeedAuthor;
  text: string;
  minutesAgo: number;
  flames: number;
  pinned?: boolean; // pinned by the post's author (shown first)
  authorFlamed?: boolean; // the post's author flamed it
  replies: Comment[];
};

type Extra = Pick<Comment, 'pinned' | 'authorFlamed'>;

const c = (
  id: string,
  author: FeedAuthor,
  minutesAgo: number,
  text: string,
  flames: number,
  replies: Comment[] = [],
  extra: Extra = {},
): Comment => ({ id, author, minutesAgo, text, flames, replies, ...extra });

export const SAMPLE_COMMENTS: Record<string, Comment[]> = {
  // Leon's RS6: a business (pinned), the author answering, a deep thread.
  p1: [
    c('p1c1', detailPro, 10, 'Faleminderit që na besuat! Doli si pasqyrë 🙌', 24, [
      c('p1c1r1', leon, 8, 'Detajimi më i mirë në Prishtinë, pa diskutim. Shihemi në pranverë për felnet.', 9),
    ], { pinned: true, authorFlamed: true }),
    c('p1c2', granit, 9, 'Çfarë ceramic përdore? Po mendoj ta bëj M4-shin para dimrit.', 8, [
      c('p1c2r1', leon, 7, 'Gtechniq Crystal Serum, dy shtresa. Ia vlen çdo cent.', 12, [
        c('p1c2r1r1', granit, 6, 'Atëherë e rezervoj këtë javë 🔥', 3, [
          c('p1c2r1r1r1', detailPro, 5, '@granit.gt na shkruaj në mesazh, kemi ende termine para dhjetorit.', 5),
        ]),
      ]),
      c('p1c2r2', vesa, 6, 'E njëjta pyetje, po e ndjek 👀', 1),
    ]),
    c('p1c3', jeta, 8, 'Kjo ngjyrë në Avant është e pabesueshme. Më ka marrë malli me e pa nëpër Prishtinë.', 15, [
      c('p1c3r1', leon, 4, 'Eja në korrik edhe bëjmë një xhiro nate 🏁', 6),
    ], { authorFlamed: true }),
    c('p1c4', ardit, 3, 'Felnet në radhë? Bronz do t’i rrinte shumë e egër.', 4),
  ],
  // Drita's convoy status: lots of people talking to each other.
  t1: [
    c('t1c1', jeta, 35, 'Brenda! Nisem nga Cyrihu më 12, mund të takohemi në Mynih një natë më herët.', 31, [
      c('t1c1r1', drita, 30, 'Perfekt, pikërisht ky është plani. Po e hap një grup.', 14, [
        c('t1c1r1r1', lira, 25, 'Më shto edhe mua, vij nga Vjena 🙋‍♀️', 9, [
          c('t1c1r1r1r1', drita, 22, '@lira.z Vjena shkon, kalojmë afër. U shtove!', 5),
        ]),
      ]),
      c('t1c1r2', fatos, 28, 'Cilën ditë po hyni në Kosovë?', 2, [
        c('t1c1r2r1', drita, 26, 'Synojmë më 14, përmes Malit të Zi.', 4),
      ]),
    ], { authorFlamed: true }),
    c('t1c2', blerim, 20, 'Një kolonë me 20 vetura nëpër Kroaci do të bëhej virale 😂', 22),
    c('t1c3', era, 15, 'Merrni diçka për të ngrënë për radhën në kufi, më besoni.', 18),
  ],
  // Besnik asking for a shop: two businesses answer, the author thanks one.
  t2: [
    c('t2c1', alignPro, 340, 'Bëjmë gjeometri me laser edhe për vetura të ulura, 25 € me kontroll. Na shkruani!', 11, [
      c('t2c1r1', besnik, 120, 'Shkova sot, tani shkon drejt si shigjetë. Faleminderit!', 7, [
        c('t2c1r1r1', alignPro, 110, 'Na vjen mirë! Kënaqu me E30 🙌', 3),
      ]),
    ], { authorFlamed: true }),
    c('t2c2', tuneGarage, 330, 'Kontrollo edhe camber-in pas amortizerëve, vetëm me toe nuk rregullohet tërheqja.', 9, [
      c('t2c2r1', besnik, 118, 'Këshillë e mirë, i rregulluan të dyja.', 2),
    ]),
    c('t2c3', granit, 300, 'Align Pro e bëri edhe timen, punë solide.', 5),
  ],
  // Granit's three Ms: short and simple.
  p4: [
    c('p4c1', leon, 280, 'Ajo rrugë është bërë për këto vetura.', 12),
    c('p4c2', era, 250, 'Cila është e jotja? 👀', 3, [
      c('p4c2r1', granit, 240, '@era.jdm M4 gri, të tjerat janë të shokëve.', 5),
    ]),
  ],
};
