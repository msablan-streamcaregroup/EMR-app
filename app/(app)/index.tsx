import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '@/constants/theme';

const highlights = [
  {
    title: 'Today’s care plan',
    body: '2 measurements and 1 medication still due.',
  },
  {
    title: 'RPM progress',
    body: 'Day 11 of 16 transmission days this month.',
  },
  {
    title: 'Next visit',
    body: 'Thursday · 10:30 AM with your care team.',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Good afternoon</Text>
      <Text style={styles.subtitle}>Here’s what needs your attention today.</Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Health status</Text>
        <Text style={styles.statusValue}>Within target</Text>
        <Text style={styles.statusHint}>
          Latest readings look stable. Keep logging today’s tasks.
        </Text>
      </View>

      {highlights.map((item) => (
        <View key={item.title} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  statusCard: {
    backgroundColor: colors.navy,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.navyBorder,
  },
  statusLabel: {
    color: colors.tealSoft,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  statusValue: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  statusHint: {
    color: '#E6FFFB',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
});
