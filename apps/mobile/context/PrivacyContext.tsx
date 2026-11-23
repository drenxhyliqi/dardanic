import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'dardanic.privateAccount';

type PrivacyValue = {
  isPrivate: boolean; // your own account
  setPrivate: (value: boolean) => void;
};

const PrivacyContext = createContext<PrivacyValue | null>(null);

// Whether your own account is private (Settings → Private account), saved on the phone
// until there's a backend.
export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => saved === 'true' && setIsPrivate(true))
      .catch(() => {});
  }, []);

  const setPrivate = useCallback((value: boolean) => {
    setIsPrivate(value);
    AsyncStorage.setItem(STORAGE_KEY, String(value)).catch(() => {});
  }, []);

  const value = useMemo(() => ({ isPrivate, setPrivate }), [isPrivate, setPrivate]);
  return <PrivacyContext.Provider value={value}>{children}</PrivacyContext.Provider>;
}

export function usePrivacy(): PrivacyValue {
  const value = useContext(PrivacyContext);
  if (!value) throw new Error('usePrivacy must be used inside PrivacyProvider');
  return value;
}
