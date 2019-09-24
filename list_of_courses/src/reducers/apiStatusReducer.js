import * as types from '../constants/actionTypes'
import initialState from './initialState'

const actionTypeEndsIsSuccess = type =>
  type.substring(type.length - 7) === 'SUCCESS'

const apiCallStatusReducer = (
  state = initialState.apiCallsinProgress,
  action
) => {
  if (action.type === types.BEGIN_API_CALL) return state + 1
  if (actionTypeEndsIsSuccess(action.type)) return state - 1
  return state
}

export default apiCallStatusReducer
