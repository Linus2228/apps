import { ADD_LIST } from '../actions/types';

export default function playlist(state = [], action) {
  if (action.type === ADD_LIST) {
    return [
      action.load
    ];
  }
  return state;
}
