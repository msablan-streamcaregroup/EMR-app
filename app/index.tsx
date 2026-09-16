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
import { colors, radii, spacing, touch, type } from '@/constants/theme';

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
            <Ionicons name="pulse" size={26} color="#FFFFFF" />
          </View>
          <View style={styles.brandText}>
            <Text style={styles.brandTitle}>A3 Platform</Text>
            <Text style={styles.brandSubtitle}>Patient app</Text>
          </View>
        </View>

        <Text style={styles.heading}>
          {isLogin ? 'Welcome back' : 'Create your account'}
        </Text>
        <Text style={styles.subheading}>
          {isLogin
            ? 'Sign in to see your care tasks and visits.'
            : 'Enter the invite code from your care team.'}
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
          <Text style={styles.label}>Email</Text>
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
              placeholder="Enter password"
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
                size={26}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>
        </View>

        {isLogin && (
          <>
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
                  <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Keep me signed in</Text>
            </Pressable>

            <Pressable accessibilityRole="button" style={styles.forgotButton}>
              <Text style={styles.link}>Forgot password?</Text>
            </Pressable>
          </>
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
            {isLogin ? 'New here?' : 'Already have an account?'}
          </Text>
          <Text style={styles.link}>
            {isLogin ? 'Register with invite code' : 'Sign in instead'}
          </Text>
        </Pressable>

        <Text style={styles.footerNote}>
          This app is not for emergencies. If you need urgent help, call 911.
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
    fontSize: type.xs,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoMark: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  brandText: {
    flex: 1,
  },
  brandTitle: {
    fontSize: type.lg,
    fontWeight: '700',
    color: colors.text,
  },
  brandSubtitle: {
    marginTop: 2,
    fontSize: type.sm,
    color: colors.textSecondary,
  },
  heading: {
    fontSize: type.xl,
    fontWeight: '700',
    color: colors.text,
  },
  subheading: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    fontSize: type.md,
    lineHeight: 26,
    color: colors.textSecondary,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: type.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    minHeight: touch.large,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    fontSize: type.md,
    color: colors.text,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
  },
  passwordWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: touch.large,
    borderRadius: radii.md,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    paddingRight: spacing.sm,
  },
  passwordInput: {
    flex: 1,
    minHeight: touch.large,
    paddingHorizontal: spacing.md,
    fontSize: type.md,
    color: colors.text,
  },
  eyeButton: {
    minWidth: touch.min,
    minHeight: touch.min,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: touch.min,
    marginBottom: spacing.sm,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkboxChecked: {
    backgroundColor: colors.teal,
  },
  checkboxLabel: {
    fontSize: type.md,
    color: colors.text,
    flex: 1,
  },
  forgotButton: {
    minHeight: touch.min,
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  link: {
    fontSize: type.md,
    fontWeight: '700',
    color: colors.tealDark,
  },
  primaryButton: {
    minHeight: touch.large,
    borderRadius: radii.md,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonPressed: {
    backgroundColor: colors.tealDark,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: type.lg,
    fontWeight: '700',
  },
  switchMode: {
    marginTop: spacing.lg,
    alignItems: 'center',
    minHeight: touch.comfortable,
    justifyContent: 'center',
    gap: 4,
  },
  switchModeText: {
    fontSize: type.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footerNote: {
    marginTop: spacing.xl,
    fontSize: type.sm,
    lineHeight: 24,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
