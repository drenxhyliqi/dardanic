import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFindMe } from '../../context/FindMeContext';
import { strings } from '../../i18n';
import { makeStyles, spacing, typography } from '../../theme';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { VehicleRow } from './VehicleRow';

const t = strings.findme;

// Your registered vehicles, each with its own "findable" switch, and Add vehicle.
export function VehiclesList() {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { vehicles, settings, saveVehicle } = useFindMe();

  return (
    <View style={styles.screen}>
      <FlatList
        data={vehicles}
        keyExtractor={(vehicle) => vehicle.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          !settings.discovery ? <Text style={styles.warning}>{t.hiddenEverywhere}</Text> : undefined
        }
        ListEmptyComponent={
          <EmptyState icon="car-sport-outline" title={t.noVehiclesTitle} hint={t.noVehiclesHint} />
        }
        renderItem={({ item }) => (
          <VehicleRow
            vehicle={item}
            findMeOn={settings.discovery}
            onPress={() => router.push({ pathname: '/findme/vehicle', params: { id: item.id } })}
            onToggle={(discoverable) => saveVehicle({ ...item, discoverable })}
          />
        )}
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button
          label={t.addVehicle}
          icon="add"
          centered
          strong
          onPress={() => router.push('/findme/vehicle')}
        />
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    list: { gap: spacing.md, padding: spacing.lg },
    warning: { ...typography.small, color: colors.textMuted },
    footer: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  }),
);
