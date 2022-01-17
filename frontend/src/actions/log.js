import axios from 'axios';
import {
    LAST_LOGIN
} from './types';

export const log_time = (id, last_login) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }; 

    const body = JSON.stringify({ last_login });

    const res = await axios.patch(`${process.env.REACT_APP_API_URL}/auth/users/${id}/`, body, config);

    dispatch({
            type: LAST_LOGIN,
            payload: res.data
    });
};