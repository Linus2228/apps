import { CHANGE_AUTH } from 'actions/types';

export default (state = false, action) => { // state is boolean whether a user is logged in o not
    switch (action.type) {
        case CHANGE_AUTH:
            return action.payload
        default:
            return state;
    }
}