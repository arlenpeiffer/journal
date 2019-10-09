import * as types from '../actions';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_PROFILE_SUCCESS:
    case types.GET_PROFILE_SUCCESS:
      const { profile } = action.payload;
      return { ...profile };
    case types.LOGIN_SUCCESS:
      const { id } = action.payload;
      return { id };
    case types.LOGOUT_SUCCESS:
      return defaultState;
    default:
      return state;
  }
};
