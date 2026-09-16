import { registerGlobals } from '@livekit/react-native';
import { registerRootComponent } from 'expo';

import App from './App';

// Required before any LiveKit / WebRTC usage
registerGlobals();

registerRootComponent(App);
