import { useState } from 'react';
import { Modal, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { FeedAuthor } from '../../data/feed';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { BottomSheet } from '../ui/BottomSheet';
import { Button } from '../ui/Button';
import { AboutAccount } from './AboutAccount';
import { ProfileMenuRow } from './ProfileMenuRow';

const t = strings.profileMenu;
const OPEN_RATIO = 0.5;
type View_ = 'menu' | 'about' | 'confirmBlock' | 'reported';

export type ProfileOptionsSheetProps = {
  person: FeedAuthor;
  visible: boolean;
  onClose: () => void;
  onMessage: () => void;
  onBlock: () => void;
  onReport: () => void;
};

// The ••• menu on someone's profile: Send message, Share profile, About this account,
// Block (asks to confirm first) and Report (then says thanks).
export function ProfileOptionsSheet(props: ProfileOptionsSheetProps) {
  const { person, visible, onClose, onMessage, onBlock, onReport } = props;
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const [view, setView] = useState<View_>('menu');
  const closed = () => {
    setView('menu');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <BottomSheet
        title={view === 'about' ? t.about : person.username}
        onClosed={closed}
        openRatio={OPEN_RATIO}
      >
        {(sheet) => (
          <View style={{ paddingBottom: insets.bottom + spacing.md }}>
            {view === 'menu' && (
              <>
                <ProfileMenuRow
                  icon="paper-plane-outline"
                  label={t.message}
                  onPress={() => {
                    sheet.close();
                    onMessage();
                  }}
                />
                <ProfileMenuRow
                  icon="share-outline"
                  label={t.share}
                  onPress={() => Share.share({ message: t.shareMessage(person.username) })}
                />
                <ProfileMenuRow
                  icon="information-circle-outline"
                  label={t.about}
                  onPress={() => setView('about')}
                />
                <ProfileMenuRow
                  icon="ban-outline"
                  label={t.block}
                  onPress={() => setView('confirmBlock')}
                />
                <ProfileMenuRow
                  icon="flag-outline"
                  label={t.report}
                  onPress={() => {
                    onReport();
                    setView('reported');
                  }}
                />
              </>
            )}
            {view === 'about' && <AboutAccount person={person} />}
            {view === 'confirmBlock' && (
              <View style={styles.confirm}>
                <Text style={styles.title}>{t.confirmBlock(person.username)}</Text>
                <Text style={styles.hint}>{t.confirmBlockHint}</Text>
                <Button
                  label={t.block}
                  small
                  strong
                  centered
                  onPress={() => {
                    onBlock();
                    sheet.close();
                  }}
                />
                <Button
                  label={t.cancel}
                  variant="secondary"
                  small
                  centered
                  onPress={() => setView('menu')}
                />
              </View>
            )}
            {view === 'reported' && (
              <View style={styles.confirm}>
                <Text style={styles.hint}>{t.reported}</Text>
              </View>
            )}
          </View>
        )}
      </BottomSheet>
    </Modal>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    confirm: { gap: spacing.md, padding: spacing.xl },
    title: { ...typography.profileName, color: colors.text },
    hint: { ...typography.paragraph, color: colors.textMuted },
  }),
);
