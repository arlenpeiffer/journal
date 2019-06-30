import { combineReducers } from 'redux';
import userInfo from './userInfo';

const user = combineReducers({ userInfo });

export default combineReducers({ user });
