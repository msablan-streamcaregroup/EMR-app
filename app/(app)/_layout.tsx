import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, spacing, type } from '@/constants/theme';

type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
};

function TabIcon({ name, color, size }: TabIconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}

function HomeTabIcon({ focused }: { focused: boolean }) {
  return (
    <View style={styles.homeTabWrap}>
      <View style={[styles.homeFab, focused && styles.homeFabFocused]}>
        <Ionicons name="home" size={28} color="#FFFFFF" />
      </View>
    </View>
  );
}

function EmergencyHeader() {
  return (
    <View style={styles.headerActions}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Call on-call nurse"
        style={styles.nurseButton}
      >
        <Ionicons name="medkit" size={20} color={colors.tealDark} />
        <Text style={styles.nurseText}>Nurse</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Call emergency 911"
        style={styles.emergencyButton}
      >
        <Ionicons name="call" size={20} color={colors.danger} />
        <Text style={styles.emergencyText}>911</Text>
      </Pressable>
    </View>
  );
}

function AppHeader({ title }: { title: string }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>
      <EmergencyHeader />
    </View>
  );
}

export default function AppLayout() {
  return (
    <Tabs
      detachInactiveScreens={false}
      screenOptions={{
        header: ({ options }) => (
          <AppHeader title={options.title ?? ''} />
        ),
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '700',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 78,
          paddingBottom: 10,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => (
            <TabIcon name="checkbox-outline" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: 'Devices',
          tabBarIcon: ({ color }) => (
            <TabIcon name="bluetooth-outline" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <HomeTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="visits"
        options={{
          title: 'Visits',
          tabBarIcon: ({ color }) => (
            <TabIcon name="videocam-outline" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="care"
        options={{
          title: 'Care',
          tabBarIcon: ({ color }) => (
            <TabIcon name="people-outline" color={color} size={26} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: type.lg,
    fontWeight: '700',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nurseButton: {
    minHeight: 48,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  nurseText: {
    color: colors.tealDark,
    fontWeight: '800',
    fontSize: type.sm,
  },
  emergencyButton: {
    minHeight: 48,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    backgroundColor: colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  emergencyText: {
    color: colors.danger,
    fontWeight: '800',
    fontSize: type.sm,
  },
  homeTabWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -16,
  },
  homeFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.surface,
  },
  homeFabFocused: {
    backgroundColor: colors.tealDark,
  },
});
