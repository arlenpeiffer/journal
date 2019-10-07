import * as types from '../actions';

const defaultState = {};

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
      return defaultState;
    default:
      return state;
  }
};
