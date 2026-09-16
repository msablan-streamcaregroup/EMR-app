import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, touch, type } from '@/constants/theme';

const highlights = [
  {
    title: 'Today’s tasks',
    body: '2 measurements and 1 medicine still due.',
    route: '/(app)/tasks' as const,
  },
  {
    title: 'Monthly progress',
    body: 'Day 11 of 16 required check-in days this month.',
    route: '/(app)/tasks' as const,
  },
  {
    title: 'Next visit',
    body: 'Thursday at 10:30 AM with your care team.',
    route: '/(app)/visits' as const,
  },
];

const shortcuts = [
  {
    title: 'Scan my device',
    body: 'Use your camera to set up new equipment.',
    icon: 'qr-code-outline' as const,
    route: '/(app)/devices' as const,
  },
  {
    title: 'Get help',
    body: 'Ask the assistant for setup help or questions.',
    icon: 'chatbubbles-outline' as const,
    route: '/(app)/care' as const,
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Hello, Name.</Text>
      <Text style={styles.subtitle}>Here is what to do today.</Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Your health status</Text>
        <Text style={styles.statusValue}>Looking good</Text>
        <Text style={styles.statusHint}>
          Your recent readings are in a normal range. Please finish today’s
          tasks.
        </Text>
      </View>

      {shortcuts.map((item) => (
        <Pressable
          key={item.title}
          accessibilityRole="button"
          onPress={() => router.push(item.route)}
          style={({ pressed }) => [
            styles.actionCard,
            pressed && styles.cardPressed,
          ]}
        >
          <View style={styles.actionIcon}>
            <Ionicons name={item.icon} size={28} color={colors.tealDark} />
          </View>
          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>{item.title}</Text>
            <Text style={styles.actionBody}>{item.body}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
        </Pressable>
      ))}

      {highlights.map((item) => (
        <Pressable
          key={item.title}
          accessibilityRole="button"
          onPress={() => router.push(item.route)}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </Pressable>
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
    fontSize: type.xxl,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: type.md,
    lineHeight: 26,
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
    fontSize: type.sm,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statusValue: {
    color: '#FFFFFF',
    fontSize: type.xl,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  statusHint: {
    color: '#E6FFFB',
    fontSize: type.md,
    lineHeight: 26,
  },
  actionCard: {
    minHeight: touch.large,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: type.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  actionBody: {
    fontSize: type.sm,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  cardPressed: {
    backgroundColor: colors.surfaceMuted,
  },
  card: {
    minHeight: touch.comfortable,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  cardTitle: {
    fontSize: type.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardBody: {
    fontSize: type.md,
    lineHeight: 26,
    color: colors.textSecondary,
  },
});
