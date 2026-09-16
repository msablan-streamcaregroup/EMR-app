import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  AudioSession,
  LiveKitRoom,
  VideoTrack,
  isTrackReference,
  useChat,
  useConnectionState,
  useLocalParticipant,
  useRoomContext,
  useTracks,
  type TrackReferenceOrPlaceholder,
} from '@livekit/react-native';
import { ConnectionState, Track } from 'livekit-client';

type Props = {
  serverUrl: string;
  token: string;
  onLeave: () => void;
  onError?: (message: string) => void;
};

export function VideoRoomScreen({ serverUrl, token, onLeave, onError }: Props) {
  const didConnectRef = useRef(false);

  useEffect(() => {
    let active = true;

    const start = async () => {
      await AudioSession.startAudioSession();
    };

    start().catch((error) => {
      if (active) {
        console.warn('Failed to start audio session', error);
      }
    });

    return () => {
      active = false;
      AudioSession.stopAudioSession();
    };
  }, []);

  return (
    <View style={styles.screen}>
      <LiveKitRoom
        serverUrl={serverUrl}
        token={token}
        connect={true}
        audio={true}
        video={true}
        options={{
          adaptiveStream: { pixelDensity: 'screen' },
        }}
        onConnected={() => {
          didConnectRef.current = true;
        }}
        onError={(error) => {
          const message = error?.message ?? 'Failed to connect to LiveKit';
          console.warn('LiveKit connection error', error);
          onError?.(message);
          // Failed connect should return to join form with the error visible.
          if (!didConnectRef.current) {
            onLeave();
          }
        }}
        onDisconnected={() => {
          // Only leave the screen after a successful session ends.
          // Failed connects used to bounce immediately via this callback.
          if (didConnectRef.current) {
            onLeave();
          }
        }}
      >
        <RoomView onLeave={onLeave} />
      </LiveKitRoom>
    </View>
  );
}

function RoomView({ onLeave }: { onLeave: () => void }) {
  const room = useRoomContext();
  const connectionState = useConnectionState();
  const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare]);
  const {
    localParticipant,
    isCameraEnabled,
    isMicrophoneEnabled,
    isScreenShareEnabled,
  } = useLocalParticipant();
  const { chatMessages, send, isSending } = useChat();

  const [chatOpen, setChatOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const toggleMic = async () => {
    await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
  };

  const toggleCamera = async () => {
    await localParticipant.setCameraEnabled(!isCameraEnabled);
  };

  const toggleScreenShare = async () => {
    try {
      await localParticipant.setScreenShareEnabled(!isScreenShareEnabled);
    } catch (error) {
      console.warn('Screen share failed', error);
    }
  };

  const leave = async () => {
    await room.disconnect();
    onLeave();
  };

  const sendMessage = async () => {
    const message = draft.trim();
    if (!message || isSending) return;
    await send(message);
    setDraft('');
  };

  const renderTrack: ListRenderItem<TrackReferenceOrPlaceholder> = ({ item }) => {
    const identity = isTrackReference(item)
      ? item.participant.identity
      : 'Connecting…';
    const sourceLabel =
      isTrackReference(item) && item.source === Track.Source.ScreenShare
        ? 'Screen'
        : 'Camera';

    return (
      <View style={styles.participantCard}>
        {isTrackReference(item) ? (
          <VideoTrack trackRef={item} style={styles.participantView} />
        ) : (
          <View style={styles.participantView} />
        )}
        <View style={styles.participantBadge}>
          <Text style={styles.participantBadgeText}>
            {identity} · {sourceLabel}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.room}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>LiveKit visit</Text>
          <Text style={styles.headerStatus}>{connectionState}</Text>
        </View>
        <Text style={styles.headerMeta}>{tracks.length} video</Text>
      </View>

      {connectionState !== ConnectionState.Connected && tracks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Connecting…</Text>
          <Text style={styles.emptyBody}>
            Waiting for LiveKit. Mic, camera, chat, and screen share controls
            appear once connected.
          </Text>
        </View>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item, index) =>
            isTrackReference(item)
              ? `${item.participant.identity}-${item.source}-${index}`
              : `placeholder-${index}`
          }
          renderItem={renderTrack}
          contentContainerStyle={styles.list}
        />
      )}

      {chatOpen && (
        <View style={styles.chatPanel}>
          <FlatList
            data={chatMessages}
            keyExtractor={(item, index) =>
              `${item.timestamp}-${item.from?.identity ?? 'unknown'}-${index}`
            }
            style={styles.chatList}
            ListEmptyComponent={
              <Text style={styles.chatEmpty}>No messages yet</Text>
            }
            renderItem={({ item }) => (
              <Text style={styles.chatLine}>
                <Text style={styles.chatAuthor}>
                  {item.from?.identity ?? 'unknown'}:{' '}
                </Text>
                {item.message}
              </Text>
            )}
          />
          <View style={styles.chatComposer}>
            <TextInput
              style={styles.chatInput}
              value={draft}
              onChangeText={setDraft}
              placeholder="Message the room"
              placeholderTextColor="#94a3b8"
              onSubmitEditing={sendMessage}
              returnKeyType="send"
            />
            <Pressable
              style={[styles.chatSend, (!draft.trim() || isSending) && styles.controlDisabled]}
              disabled={!draft.trim() || isSending}
              onPress={sendMessage}
            >
              <Text style={styles.controlText}>Send</Text>
            </Pressable>
          </View>
        </View>
      )}

      <View style={styles.controls}>
        <ControlButton
          label={isMicrophoneEnabled ? 'Mute' : 'Unmute'}
          active={!isMicrophoneEnabled}
          onPress={toggleMic}
        />
        <ControlButton
          label={isCameraEnabled ? 'Cam off' : 'Cam on'}
          active={!isCameraEnabled}
          onPress={toggleCamera}
        />
        <ControlButton
          label={isScreenShareEnabled ? 'Stop share' : 'Share'}
          active={isScreenShareEnabled}
          onPress={toggleScreenShare}
        />
        <ControlButton
          label="Chat"
          active={chatOpen}
          onPress={() => setChatOpen((open) => !open)}
        />
        <ControlButton label="Leave" danger onPress={leave} />
      </View>
    </KeyboardAvoidingView>
  );
}

function ControlButton({
  label,
  onPress,
  active = false,
  danger = false,
}: {
  label: string;
  onPress: () => void;
  active?: boolean;
  danger?: boolean;
}) {
  return (
    <Pressable
      style={[
        styles.controlButton,
        active && styles.controlActive,
        danger && styles.controlDanger,
      ]}
      onPress={onPress}
    >
      <Text style={styles.controlText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  room: {
    flex: 1,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '600',
  },
  headerStatus: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  headerMeta: {
    color: '#94a3b8',
    fontSize: 12,
  },
  list: {
    padding: 12,
    paddingBottom: 24,
  },
  participantCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1e293b',
  },
  participantView: {
    height: 240,
    backgroundColor: '#1e293b',
  },
  participantBadge: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  participantBadgeText: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyBody: {
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
  },
  chatPanel: {
    maxHeight: 220,
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    overflow: 'hidden',
  },
  chatList: {
    maxHeight: 150,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  chatEmpty: {
    color: '#94a3b8',
    marginBottom: 10,
  },
  chatLine: {
    color: '#e2e8f0',
    marginBottom: 8,
    lineHeight: 18,
  },
  chatAuthor: {
    fontWeight: '700',
    color: '#5eead4',
  },
  chatComposer: {
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#334155',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#f8fafc',
  },
  chatSend: {
    backgroundColor: '#0f766e',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 8,
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    minWidth: 72,
    alignItems: 'center',
  },
  controlActive: {
    backgroundColor: '#b45309',
  },
  controlDanger: {
    backgroundColor: '#dc2626',
  },
  controlDisabled: {
    opacity: 0.45,
  },
  controlText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});
