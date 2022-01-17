import {
    READ,
    CREATE
} from '../actions/types';

const initialState = {
    _datas: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case READ:
        case CREATE:
            return{
                ...state,
                _datas: payload
            }
        default:
            return state
    }
};