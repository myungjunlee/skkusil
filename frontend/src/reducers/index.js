import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';
import apost from './apost';
import log from './log';

export default combineReducers({
    auth, post, apost, log
});