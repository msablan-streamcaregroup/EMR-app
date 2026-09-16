import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, touch, type } from '@/constants/theme';

const sections = [
  {
    title: 'Get help',
    body: 'Ask questions or get help setting up your devices.',
    icon: 'chatbubbles-outline' as const,
  },
  {
    title: 'My caregivers',
    body: 'Add family or helpers who can support your care.',
    icon: 'people-outline' as const,
  },
  {
    title: 'Documents to sign',
    body: 'Read and sign forms from your care team.',
    icon: 'document-text-outline' as const,
  },
  {
    title: 'My health summary',
    body: 'See simple charts and notes about your progress.',
    icon: 'stats-chart-outline' as const,
  },
  {
    title: 'Language',
    body: 'Choose English, Spanish, or Chinese.',
    icon: 'language-outline' as const,
  },
];

export default function CareScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>
        Help, family support, and your account settings.
      </Text>

      {sections.map((item) => (
        <Pressable
          key={item.title}
          accessibilityRole="button"
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.iconWrap}>
            <Ionicons name={item.icon} size={26} color={colors.tealDark} />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.body}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
        </Pressable>
      ))}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Log out"
        onPress={() => router.replace('/')}
        style={({ pressed }) => [styles.logoutButton, pressed && styles.cardPressed]}
      >
        <Ionicons name="log-out-outline" size={24} color={colors.danger} />
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
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
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  subtitle: {
    fontSize: type.md,
    lineHeight: 26,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  card: {
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
  cardPressed: {
    backgroundColor: colors.surfaceMuted,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: type.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  cardBody: {
    fontSize: type.sm,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  logoutButton: {
    marginTop: spacing.sm,
    minHeight: touch.large,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.dangerSoft,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  logoutText: {
    fontSize: type.md,
    fontWeight: '700',
    color: colors.danger,
  },
});
