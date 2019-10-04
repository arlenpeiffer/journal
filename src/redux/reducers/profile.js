import {
  ADD_PROFILE,
  LOGIN,
  LOGOUT,
  REQUEST_PROFILE_SUCCESS
} from '../actions';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_PROFILE:
    case REQUEST_PROFILE_SUCCESS:
      const { profile } = action.payload;
      return { ...profile };
    case LOGIN:
      const { id } = action.payload;
      return { id };
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};
