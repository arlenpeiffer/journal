import * as types from '../actions';

const defaultState = null;

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_PROFILE_FAILURE:
    case types.LOGIN_FAILURE:
    case types.LOGOUT_FAILURE:
      const { error } = action.payload;
      return error;
    case types.ADD_PROFILE_SUCCESS:
    case types.LOGIN_SUCCESS:
    case types.LOGOUT_SUCCESS:
    case types.RESET_ERRORS:
      return defaultState;
    default:
      return state;
  }
};
