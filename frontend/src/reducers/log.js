import {
    LAST_LOGIN
} from '../actions/types';

const initialState = {
    time: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case LAST_LOGIN:
            return{
                ...state,
                time: payload
            }
        default:
            return state
    }
};