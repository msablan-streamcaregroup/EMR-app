import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, type } from '@/constants/theme';

export default function VisitsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.body}>
        This is where you will join video visits with your care team in one tap.
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
