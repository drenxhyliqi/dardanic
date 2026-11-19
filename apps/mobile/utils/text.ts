// Lowercase and swap Albanian letters for plain ones (ë → e, ç → c),
// so "Fushe" finds "Fushë Kosova" and names turn into clean usernames.
export function simplify(text: string): string {
  return text.toLowerCase().replace(/ë/g, 'e').replace(/ç/g, 'c');
}

// Up to two capital letters for an avatar: "Arben Krasniqi" → "AK", "arben.k" → "AK", "arben" → "A".
export function initials(name: string): string {
  return name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}
