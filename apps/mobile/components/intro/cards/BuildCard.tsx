import { StyleSheet, Text, View } from 'react-native';

import type { IntroBuild } from '../../../data/intro';
import { strings } from '../../../i18n';
import { makeStyles, spacing, typography } from '../../../theme';
import { Stat } from '../../ui/Stat';
import { Tag } from '../../ui/Tag';
import { CardFrame } from './CardParts';

const t = strings.intro;

// Step 3: a build, like a spec sheet. Active = featured. Tall cards add 0–100 and mods.
export function BuildCard({ build }: { build: IntroBuild }) {
  const styles = useStyles();
  return (
    <CardFrame active={build.active}>
      <View>
        <Text style={styles.car} numberOfLines={1}>
          {build.car}
        </Text>
        <Text style={styles.muted} numberOfLines={1}>
          @{build.username}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stats}>
          <Stat value={String(build.hp)} label={t.hp} />
          {build.tall && <Stat value={build.sprint} label={t.sprint} />}
        </View>
        {build.active && !build.tall && <Tag label={t.featured} tone="blue" />}
      </View>

      {build.tall && (
        <View style={styles.tags}>
          {build.active ? <Tag label={t.featured} tone="blue" /> : <Tag label={build.mods[0]} />}
          <Tag label={build.mods[1]} />
        </View>
      )}
    </CardFrame>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    car: {
      ...typography.name,
      color: colors.text,
    },
    muted: {
      ...typography.small,
      color: colors.textMuted,
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    stats: {
      flexDirection: 'row',
      gap: spacing.lg,
    },
    tags: {
      flexDirection: 'row',
      gap: spacing.xs,
    },
  }),
);
