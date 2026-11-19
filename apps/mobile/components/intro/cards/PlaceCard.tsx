import { StyleSheet, Text, View } from 'react-native';

import type { IntroPlace } from '../../../data/intro';
import { strings } from '../../../i18n';
import { makeStyles, radius, sizes, spacing, typography, useColors } from '../../../theme';
import { CardFrame } from './CardParts';

const t = strings.intro;

// Step 2: something near you (meet, build or shop) with its distance and time.
// Active = happening now / tonight. Tall meet cards show who's going.
export function PlaceCard({ place }: { place: IntroPlace }) {
  const colors = useColors();
  const dotColors = [colors.primarySoft, colors.skeleton, colors.borderFocus];
  const styles = useStyles();
  const showGoing = place.tall && place.going > 0;

  return (
    <CardFrame active={place.active}>
      <View style={styles.top}>
        <Text style={[styles.kind, place.active && styles.kindActive]}>{t.kinds[place.kind]}</Text>
        <Text style={styles.distance}>
          {place.km}
          <Text style={styles.unit}> {t.km}</Text>
        </Text>
      </View>

      <View>
        <Text style={styles.title} numberOfLines={1}>
          {place.title}
        </Text>
        <Text style={[styles.muted, place.active && styles.whenActive]} numberOfLines={1}>
          {place.when}
        </Text>
      </View>

      {showGoing && (
        <View style={styles.going}>
          <View style={styles.dots}>
            {dotColors.map((color, i) => (
              <View
                key={i}
                style={[styles.dot, { backgroundColor: color }, i > 0 && styles.dotOverlap]}
              />
            ))}
          </View>
          <Text style={styles.muted}>{t.going(place.going)}</Text>
        </View>
      )}
    </CardFrame>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    top: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
    },
    kind: {
      ...typography.badge,
      color: colors.textMuted,
      textTransform: 'uppercase',
    },
    kindActive: {
      color: colors.primaryLight,
    },
    distance: {
      ...typography.stat,
      color: colors.text,
    },
    unit: {
      ...typography.badge,
      color: colors.textMuted,
    },
    title: {
      ...typography.name,
      color: colors.text,
    },
    whenActive: {
      color: colors.primaryLight,
    },
    going: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    dots: {
      flexDirection: 'row',
    },
    dot: {
      width: sizes.introDot,
      height: sizes.introDot,
      borderRadius: radius.full,
      borderWidth: 2,
      borderColor: colors.surface,
    },
    dotOverlap: {
      marginLeft: -spacing.sm,
    },
    muted: {
      ...typography.small,
      color: colors.textMuted,
    },
  }),
);
