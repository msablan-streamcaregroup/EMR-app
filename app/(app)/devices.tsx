import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, type } from '@/constants/theme';

export default function DevicesScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.body}>
        This is where you will connect your health devices, check battery, and
        scan new equipment.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  body: {
    fontSize: type.md,
    lineHeight: 26,
    color: colors.textSecondary,
  },
});
