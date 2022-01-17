import axios from 'axios';
import {
    DETAIL,
    UPDATE,
    REMOVE
} from './types';

export const detail = (id) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }; 

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/post/${id}/`, config);

    dispatch({
            type: DETAIL,
            payload: res.data
    });
};

export const update = (id, formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }; 

    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/post/${id}/`, formData, config);

    dispatch({
            type: UPDATE,
            payload: res.data
    });
};

export const remove = (id) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/post/${id}/`, config);

    dispatch({
            type: REMOVE,
            payload: res.data
    });
};