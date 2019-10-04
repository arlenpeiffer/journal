import {
  REQUEST_JOURNAL,
  REQUEST_JOURNAL_FAILURE,
  REQUEST_JOURNAL_SUCCESS,
  REQUEST_LOGS,
  REQUEST_LOGS_FAILURE,
  REQUEST_LOGS_SUCCESS,
  REQUEST_PROFILE,
  REQUEST_PROFILE_FAILURE,
  REQUEST_PROFILE_SUCCESS
} from '../actions';

const defaultState = 0;

export default (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_JOURNAL:
    case REQUEST_LOGS:
    case REQUEST_PROFILE:
      return state + 1;
    case REQUEST_JOURNAL_FAILURE:
    case REQUEST_JOURNAL_SUCCESS:
    case REQUEST_LOGS_FAILURE:
    case REQUEST_LOGS_SUCCESS:
    case REQUEST_PROFILE_FAILURE:
    case REQUEST_PROFILE_SUCCESS:
      return state - 1;
    default:
      return state;
  }
};
