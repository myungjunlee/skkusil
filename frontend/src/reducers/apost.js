import {
    DETAIL,
    UPDATE,
    REMOVE
} from '../actions/types';

const initialState = {
    _data: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case DETAIL:
        case UPDATE:
        case REMOVE:
            return{
                ...state,
                _data: payload
            }
        default:
            return state
    }
};