import {
  ADD_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILE,
  LOGIN,
  LOGOUT
} from '../actions';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return { ...action.payload.profile };
    case CLEAR_PROFILE:
      return defaultState;
    case GET_PROFILE:
      return { ...action.payload.profile };
    case LOGIN:
      return { id: action.payload.id };
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};
