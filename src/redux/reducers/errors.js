import * as types from '../actions';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.LOGIN_FAILURE:
      return {
        ...state,
        login: action.payload.error
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        login: undefined
      };
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        logout: action.payload.error
      };
    case types.LOGOUT_SUCCESS:
      return defaultState;
    default:
      return state;
  }
};
