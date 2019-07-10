import { combineReducers } from 'redux';
import journal from './journal';
import logs from './logs';
import userInfo from './userInfo';

const user = combineReducers({
  journal,
  logs,
  userInfo
});

export default combineReducers({ user });
