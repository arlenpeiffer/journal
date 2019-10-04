import * as types from '../actions';

const defaultState = 0;

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.GET_JOURNAL_REQUEST:
    case types.GET_LOGS_REQUEST:
    case types.GET_PROFILE_REQUEST:
      return state + 1;
    case types.GET_JOURNAL_SUCCESS:
    case types.GET_JOURNAL_FAILURE:
    case types.GET_LOGS_SUCCESS:
    case types.GET_LOGS_FAILURE:
    case types.GET_PROFILE_SUCCESS:
    case types.GET_PROFILE_FAILURE:
      return state - 1;
    default:
      return state;
  }
};
