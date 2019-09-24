import { PLAY_TRACK } from './types';

const playTrack = newId => ({
  type: PLAY_TRACK,
  payload: {
    isPlaying: true,
    trackID: newId
  }
});

export default playTrack;
