import { combineReducers } from 'redux';
import errors from './errors';
import filters from './filters';
import journal from './journal';
import logs from './logs';
import profile from './profile';
import requests from './requests';

const ui = combineReducers({
  errors,
  filters,
  requests
});

const user = combineReducers({
  journal,
  logs,
  profile
});

export default combineReducers({ ui, user });
