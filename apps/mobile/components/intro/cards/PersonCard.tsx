import { StyleSheet, Text, View } from 'react-native';

import type { IntroPerson } from '../../../data/intro';
import { strings } from '../../../i18n';
import { makeStyles, radius, sizes, spacing, typography } from '../../../theme';
import { initials } from '../../../utils/text';
import { Tag } from '../../ui/Tag';
import { CardFrame, Plate } from './CardParts';

const t = strings.intro;

// Step 1: a person. Active = you follow them. Tall cards also show the car and its plate.
export function PersonCard({ person }: { person: IntroPerson }) {
  const styles = useStyles();
  return (
    <CardFrame active={person.active}>
      <View style={styles.top}>
        <View style={[styles.avatar, person.active && styles.avatarActive]}>
          <Text style={styles.avatarText}>{initials(person.name)}</Text>
        </View>
        <Tag
          label={person.active ? t.following : t.follow}
          tone={person.active ? 'outline' : 'quiet'}
        />
      </View>

      <View>
        <Text style={styles.name} numberOfLines={1}>
          {person.name}
        </Text>
        <Text style={styles.muted} numberOfLines={1}>
          @{person.username}
        </Text>
      </View>

      {person.tall && (
        <View style={styles.car}>
          <Text style={styles.carName} numberOfLines={1}>
            {person.car}
          </Text>
          <Plate text={person.plate} />
        </View>
      )}

      <Text style={styles.muted} numberOfLines={1}>
        {t.followers(person.followers)}
      </Text>
    </CardFrame>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    top: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.xs,
    },
    avatar: {
      width: sizes.introAvatar,
      height: sizes.introAvatar,
      borderRadius: radius.full,
      backgroundColor: colors.surfaceBorder,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarActive: {
      backgroundColor: colors.primarySoft,
    },
    avatarText: {
      ...typography.label,
      color: colors.text,
    },
    name: {
      ...typography.name,
      color: colors.text,
    },
    car: {
      gap: spacing.xs,
    },
    carName: {
      ...typography.small,
      color: colors.text,
    },
    muted: {
      ...typography.small,
      color: colors.textMuted,
    },
  }),
);
