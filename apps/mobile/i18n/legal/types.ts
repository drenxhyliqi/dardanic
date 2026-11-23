// The shape of a legal page: a title, when it last changed, a short intro, then
// numbered sections with paragraphs, bullet points and a closing line after them.
export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  closing?: string[]; // shown after the bullets
};

export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};
