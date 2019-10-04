import * as types from '../actions';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_PROFILE:
    case types.REQUEST_PROFILE_SUCCESS:
      const { profile } = action.payload;
      return { ...profile };
    case types.LOGIN:
      const { id } = action.payload;
      return { id };
    case types.LOGOUT:
      return defaultState;
    default:
      return state;
  }
};
