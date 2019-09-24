import axios from 'axios';

import { ADD_LIST } from './types';
import * as constants from '../data/constants';

const addListObj = response => ({ type: ADD_LIST, load: response });

const addList = query => (dispatch) => {
  const REQUEST_URL = `${constants.API_URL}${constants.CLIENT_ID}&q=${query}`;
  axios.get(REQUEST_URL)
    .then(response => dispatch(addListObj(response.data)))
    .catch((error) => { throw new Error(error.response.data); });
};

export default addList;
