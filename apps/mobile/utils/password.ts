// The rules a new password has to meet (shown as a live checklist when creating it).
export const MIN_PASSWORD = 8;

export type PasswordCheck = { length: boolean; letter: boolean; number: boolean; match: boolean };

export function checkPassword(password: string, repeat: string): PasswordCheck {
  return {
    length: password.length >= MIN_PASSWORD,
    letter: /[A-Za-zÀ-ž]/.test(password),
    number: /\d/.test(password),
    match: password.length > 0 && password === repeat,
  };
}

export const passwordOk = (check: PasswordCheck) => Object.values(check).every(Boolean);
