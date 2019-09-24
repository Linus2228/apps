import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import playlist from './playlist';
import trackControl from './trackControl';

export default combineReducers({
  playlist,
  form: formReducer,
  trackControl
});
