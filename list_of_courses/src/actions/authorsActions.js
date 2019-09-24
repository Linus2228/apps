import * as types from '../constants/actionTypes'
import * as authorApi from '../api/authorApi'
import { beginApiCall } from './apiStatusActions'

const loadAuthorsSuccess = authors => ({
  type: types.LOAD_AUTHORS_SUCCESS,
  authors
}) 

export const loadAuthors = () => dispatch => {
  dispatch(beginApiCall())
  return authorApi.getAuthors()
    .then(authors => {
      dispatch(loadAuthorsSuccess(authors))
    })
    .catch(error => {
      throw error
    })
}
