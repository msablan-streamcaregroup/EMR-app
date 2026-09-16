import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { VideoRoomScreen } from './src/screens/VideoRoomScreen';

function sanitizeServerUrl(value: string) {
  return value.trim().replace(/\/+$/, '');
}

function sanitizeToken(value: string) {
  // Multiline paste can introduce spaces/newlines that break JWT auth.
  return value.replace(/\s+/g, '');
}

export default function App() {
  const [serverUrl, setServerUrl] = useState(
    process.env.EXPO_PUBLIC_LIVEKIT_URL ??
      process.env.LIVEKIT_URL ??
      'wss://a3-app-8loi2kwo.livekit.cloud',
  );
  const [token, setToken] = useState('');
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cleanedUrl = sanitizeServerUrl(serverUrl);
  const cleanedToken = sanitizeToken(token);

  if (joined && cleanedToken) {
    return (
      <VideoRoomScreen
        serverUrl={cleanedUrl}
        token={cleanedToken}
        onLeave={() => setJoined(false)}
        onError={(message) => setError(message)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.brand}>StreamCare</Text>
        <Text style={styles.title}>LiveKit video test</Text>
        <Text style={styles.subtitle}>
          Paste the WebSocket URL and token separately (do not combine them).
          Generate a token with npm run livekit:token.
        </Text>

        <Text style={styles.label}>Server URL</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={serverUrl}
          onChangeText={(value) => {
            setError(null);
            setServerUrl(value);
          }}
          placeholder="wss://…livekit.cloud"
        />

        <Text style={styles.label}>Access token</Text>
        <TextInput
          style={[styles.input, styles.tokenInput]}
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          value={token}
          onChangeText={(value) => {
            setError(null);
            setToken(value);
          }}
          placeholder="Paste token from npm run livekit:token"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={[styles.button, !cleanedToken && styles.buttonDisabled]}
          disabled={!cleanedToken}
          onPress={() => {
            setError(null);
            setJoined(true);
          }}
        >
          <Text style={styles.buttonText}>Join room</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  brand: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f766e',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    color: '#475569',
    lineHeight: 22,
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    color: '#0f172a',
  },
  tokenInput: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  error: {
    color: '#b91c1c',
    marginBottom: 12,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#0f766e',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
