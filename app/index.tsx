import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, spacing } from '@/constants/theme';

type AuthMode = 'login' | 'signup';

export default function LoginScreen() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [inviteCode, setInviteCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const isLogin = mode === 'login';

  const handleSubmit = () => {
    // UI shell only — auth wiring comes later
    router.replace('/(app)');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Text style={styles.orgLabel}>STREAMCARE GROUP</Text>

        <View style={styles.brandRow}>
          <View style={styles.logoMark}>
            <Ionicons name="pulse" size={22} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.brandTitle}>A3 Platform</Text>
            <Text style={styles.brandSubtitle}>Patient Mobile App</Text>
          </View>
        </View>

        <Text style={styles.hero}>
          Your care tasks, devices, and visits in one place.
        </Text>

        <Text style={styles.cardTitle}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Text>
        <Text style={styles.cardSubtitle}>
          {isLogin
            ? 'Sign in to your care dashboard'
            : 'Register with your invite code'}
        </Text>

        {!isLogin && (
          <View style={styles.field}>
            <Text style={styles.label}>Invite code</Text>
            <TextInput
              value={inviteCode}
              onChangeText={setInviteCode}
              placeholder="Enter invite code"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="characters"
              style={styles.input}
            />
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@email.com"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrap}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.textMuted}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                showPassword ? 'Hide password' : 'Show password'
              }
              onPress={() => setShowPassword((value) => !value)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={colors.textMuted}
              />
            </Pressable>
          </View>
        </View>

        {isLogin && (
          <View style={styles.optionsRow}>
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: keepSignedIn }}
              onPress={() => setKeepSignedIn((value) => !value)}
              style={styles.checkboxRow}
            >
              <View
                style={[
                  styles.checkbox,
                  keepSignedIn && styles.checkboxChecked,
                ]}
              >
                {keepSignedIn && (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Keep me signed in</Text>
            </Pressable>

            <Pressable accessibilityRole="button">
              <Text style={styles.link}>Forgot password?</Text>
            </Pressable>
          </View>
        )}

        <Pressable
          accessibilityRole="button"
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>
            {isLogin ? 'Sign In' : 'Create account'}
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => setMode(isLogin ? 'signup' : 'login')}
          style={styles.switchMode}
        >
          <Text style={styles.switchModeText}>
            {isLogin ? 'New user? ' : 'Already have an account? '}
            <Text style={styles.link}>
              {isLogin ? 'Register with invite code' : 'Sign in'}
            </Text>
          </Text>
        </Pressable>

        <Text style={styles.footerNote}>
          Protected by HIPAA-compliant security · Not for emergencies — call
          911 if you need urgent help
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    justifyContent: 'center',
  },
  orgLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.4,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  brandSubtitle: {
    marginTop: 2,
    fontSize: 14,
    color: colors.textSecondary,
  },
  hero: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.lg,
    maxWidth: 340,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
  },
  cardSubtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    fontSize: 15,
    color: colors.textSecondary,
  },
  field: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    minHeight: 52,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.input,
  },
  passwordWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    borderRadius: radii.md,
    backgroundColor: colors.input,
    paddingRight: spacing.sm,
  },
  passwordInput: {
    flex: 1,
    minHeight: 52,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  eyeButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  checkboxChecked: {
    backgroundColor: colors.teal,
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.teal,
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: radii.md,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  primaryButtonPressed: {
    backgroundColor: colors.tealDark,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  switchMode: {
    marginTop: spacing.lg,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  switchModeText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footerNote: {
    marginTop: spacing.lg,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
