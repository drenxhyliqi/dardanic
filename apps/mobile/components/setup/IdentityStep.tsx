import { StyleSheet, Text, View } from 'react-native';

import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { Chip } from '../ui/Chip';
import { TextField } from '../ui/TextField';
import { MAX_USERNAME, toUsername, usernameIdeas } from './usernameIdeas';

export type IdentityStepProps = {
  username: string;
  displayName: string;
  onChangeUsername: (value: string) => void;
  onChangeDisplayName: (value: string) => void;
};

// Step 1: username (with ideas based on what they type) and display name.
export function IdentityStep({
  username,
  displayName,
  onChangeUsername,
  onChangeDisplayName,
}: IdentityStepProps) {
  const styles = useStyles();
  const t = strings.setup;
  const ideas = usernameIdeas(displayName, username);

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <TextField
          label={t.username}
          placeholder={t.usernamePlaceholder}
          value={username}
          onChangeText={(text) => onChangeUsername(toUsername(text))}
          maxLength={MAX_USERNAME}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="username"
          icon="at"
        />
        <Text style={styles.hint}>{t.usernameHint}</Text>
        {ideas.length > 0 && (
          <View style={styles.ideas}>
            <Text style={styles.ideasLabel}>{t.ideas}</Text>
            <View style={styles.chips}>
              {ideas.map((idea) => (
                <Chip key={idea} label={idea} onPress={() => onChangeUsername(idea)} />
              ))}
            </View>
          </View>
        )}
      </View>

      <TextField
        label={t.displayName}
        placeholder={t.displayNamePlaceholder}
        value={displayName}
        onChangeText={onChangeDisplayName}
        autoCapitalize="words"
        textContentType="name"
      />
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    container: {
      gap: spacing.xl,
    },
    group: {
      gap: spacing.sm,
    },
    hint: {
      ...typography.small,
      color: colors.textMuted,
    },
    ideas: {
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    ideasLabel: {
      ...typography.label,
      color: colors.textMuted,
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
  }),
);
