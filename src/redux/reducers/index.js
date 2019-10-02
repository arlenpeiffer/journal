import { combineReducers } from 'redux';
import filters from './filters';
import journal from './journal';
import logs from './logs';
import profile from './profile';

const user = combineReducers({
  filters,
  journal,
  logs,
  profile
});

export default combineReducers({ user });
