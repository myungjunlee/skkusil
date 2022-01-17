import axios from 'axios';
import {
    READ,
    CREATE
} from './types';

export const read = () => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }; 

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/post/`, config);

    dispatch({
        type: READ,
        payload: res.data
    });

};

export const create = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }; 

    let res = await axios.post(`${process.env.REACT_APP_API_URL}/api/post/`, formData, config);

    res = await axios.get(`${process.env.REACT_APP_API_URL}/api/post/`, config);

    dispatch({
            type: CREATE,
            payload: res.data
    });
};