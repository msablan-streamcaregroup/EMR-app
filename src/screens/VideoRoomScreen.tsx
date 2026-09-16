import { useEffect } from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  AudioSession,
  LiveKitRoom,
  VideoTrack,
  isTrackReference,
  useTracks,
  type TrackReferenceOrPlaceholder,
} from '@livekit/react-native';
import { Track } from 'livekit-client';

type Props = {
  serverUrl: string;
  token: string;
  onLeave: () => void;
};

export function VideoRoomScreen({ serverUrl, token, onLeave }: Props) {
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LiveKit visit</Text>
        <Pressable style={styles.leaveButton} onPress={onLeave}>
          <Text style={styles.leaveButtonText}>Leave</Text>
        </Pressable>
      </View>

      <LiveKitRoom
        serverUrl={serverUrl}
        token={token}
        connect={true}
        audio={true}
        video={true}
        options={{
          adaptiveStream: { pixelDensity: 'screen' },
        }}
      >
        <RoomView />
      </LiveKitRoom>
    </View>
  );
}

function RoomView() {
  const tracks = useTracks([Track.Source.Camera]);

  const renderTrack: ListRenderItem<TrackReferenceOrPlaceholder> = ({ item }) => {
    if (isTrackReference(item)) {
      return <VideoTrack trackRef={item} style={styles.participantView} />;
    }
    return <View style={styles.participantView} />;
  };

  return (
    <View style={styles.room}>
      {tracks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Connecting…</Text>
          <Text style={styles.emptyBody}>
            Camera preview appears once LiveKit connects. Open a second device
            with another token to see a remote participant.
          </Text>
        </View>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderTrack}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '600',
  },
  leaveButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  leaveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  room: {
    flex: 1,
  },
  list: {
    padding: 12,
    gap: 12,
  },
  participantView: {
    height: 280,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1e293b',
    marginBottom: 12,
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
});
