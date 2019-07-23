import { combineReducers } from 'redux';
import filters from './filters';
import journal from './journal';
import logs from './logs';
import userInfo from './userInfo';

const user = combineReducers({
  filters,
  journal,
  logs,
  userInfo
});

export default combineReducers({ user });
