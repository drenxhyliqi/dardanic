import { simplify } from '../../utils/text';

const ENDINGS = ['.garage', '_builds', '.motorsport', '.drives'];
const MIN_BASE = 2;
const MAX_BASE = 20;
export const MAX_USERNAME = 30;

// Keep only what a username may contain: a–z, 0–9, dots and underscores.
export function toUsername(text: string): string {
  return simplify(text)
    .replace(/[^a-z0-9._]/g, '')
    .slice(0, MAX_USERNAME);
}

// Turn what the user typed (display name first, else username) into ideas like
// "arben.garage". Endings we added before are removed so ideas don't stack up.
export function usernameIdeas(displayName: string, username: string): string[] {
  const source = displayName.trim() || username;
  let base = toUsername(source);
  for (const ending of ENDINGS) {
    if (base.endsWith(ending)) base = base.slice(0, -ending.length);
  }
  base = base.replace(/[._]+$/, '').slice(0, MAX_BASE);
  if (base.length < MIN_BASE) return [];
  return ENDINGS.map((ending) => base + ending).filter((idea) => idea !== username);
}
