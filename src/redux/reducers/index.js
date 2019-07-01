import { combineReducers } from 'redux';
import journal from './journal';
import userInfo from './userInfo';

const user = combineReducers({
  journal,
  userInfo
});

export default combineReducers({ user });
