/**
 * Generate a short-lived LiveKit access token for local testing.
 *
 * Usage:
 *   npm run livekit:token
 *   npm run livekit:token -- --identity nurse-1 --room visit-demo
 *
 * Requires .env with:
 *   LIVEKIT_API_KEY=
 *   LIVEKIT_API_SECRET=
 *   LIVEKIT_URL=   (optional, printed for convenience)
 */
import 'dotenv/config';
import { AccessToken } from 'livekit-server-sdk';

function argValue(flag, fallback) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || !process.argv[index + 1]) return fallback;
  return process.argv[index + 1];
}

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;
const serverUrl = process.env.LIVEKIT_URL ?? process.env.EXPO_PUBLIC_LIVEKIT_URL;

if (!apiKey || !apiSecret) {
  console.error(
    'Missing LIVEKIT_API_KEY or LIVEKIT_API_SECRET.\n' +
      'Create a project at https://cloud.livekit.io, copy keys into .env, then retry.',
  );
  process.exit(1);
}

const identity = argValue('--identity', `patient-${Date.now().toString(36)}`);
const roomName = argValue('--room', 'emr-visit-demo');
const ttl = argValue('--ttl', '2h');

const at = new AccessToken(apiKey, apiSecret, {
  identity,
  ttl,
});

at.addGrant({
  roomJoin: true,
  room: roomName,
  canPublish: true,
  canSubscribe: true,
});

const token = await at.toJwt();

console.log('\nLiveKit test token\n');
console.log(`Room:      ${roomName}`);
console.log(`Identity:  ${identity}`);
console.log(`TTL:       ${ttl}`);
if (serverUrl) {
  console.log(`Server:    ${serverUrl}`);
}
console.log('\nToken:\n');
console.log(token);
console.log(
  '\nPaste the server URL + token into the app Join screen, then open a second token with a different --identity to test two participants.\n',
);
