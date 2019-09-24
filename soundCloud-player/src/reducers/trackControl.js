import { PLAY_TRACK } from '../actions/types';

const defaultState = {
  isPlaying: false,
  trackID: 0
};

function trackControl(state = defaultState, action) {
  switch (action.type) {
    case PLAY_TRACK:
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
        trackID: Number(action.payload.trackID, 10)
      };
    default:
      return state;
  }
}

export default trackControl;
