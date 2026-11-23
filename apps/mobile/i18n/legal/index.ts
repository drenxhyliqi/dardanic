// The legal pages' text (English), read by app/terms, app/privacy, app/guidelines
// and app/license through strings.legalDocs.
import { guidelines } from './guidelines';
import { license } from './license';
import { privacy } from './privacy';
import { terms } from './terms';

export const legalDocs = { terms, privacy, guidelines, license };
export type { LegalDoc, LegalSection } from './types';
