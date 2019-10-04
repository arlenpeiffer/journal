import * as types from '../actions';

const defaultState = 0;

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.REQUEST_JOURNAL:
    case types.REQUEST_LOGS:
    case types.REQUEST_PROFILE:
      return state + 1;
    case types.REQUEST_JOURNAL_FAILURE:
    case types.REQUEST_JOURNAL_SUCCESS:
    case types.REQUEST_LOGS_FAILURE:
    case types.REQUEST_LOGS_SUCCESS:
    case types.REQUEST_PROFILE_FAILURE:
    case types.REQUEST_PROFILE_SUCCESS:
      return state - 1;
    default:
      return state;
  }
};
