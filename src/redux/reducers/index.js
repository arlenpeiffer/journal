import { combineReducers } from 'redux';
import filters from './filters';
import journal from './journal';
import logs from './logs';
import profile from './profile';
import requests from './requests';

const ui = combineReducers({
  filters,
  requests
});

const user = combineReducers({
  journal,
  logs,
  profile
});

export default combineReducers({ ui, user });
