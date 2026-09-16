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

export default function App() {
  const [serverUrl, setServerUrl] = useState(
    process.env.EXPO_PUBLIC_LIVEKIT_URL ?? 'wss://your-project.livekit.cloud',
  );
  const [token, setToken] = useState('');
  const [joined, setJoined] = useState(false);

  if (joined && token.trim()) {
    return (
      <VideoRoomScreen
        serverUrl={serverUrl.trim()}
        token={token.trim()}
        onLeave={() => setJoined(false)}
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
          Paste a LiveKit WebSocket URL and room token, then join. Generate a
          token with npm run livekit:token.
        </Text>

        <Text style={styles.label}>Server URL</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={serverUrl}
          onChangeText={setServerUrl}
          placeholder="wss://…livekit.cloud"
        />

        <Text style={styles.label}>Access token</Text>
        <TextInput
          style={[styles.input, styles.tokenInput]}
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          value={token}
          onChangeText={setToken}
          placeholder="Paste token from npm run livekit:token"
        />

        <Pressable
          style={[styles.button, !token.trim() && styles.buttonDisabled]}
          disabled={!token.trim()}
          onPress={() => setJoined(true)}
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
