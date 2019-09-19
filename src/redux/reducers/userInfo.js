import { SET_IS_LOGGED_IN, SET_IS_LOGGED_OUT } from '../actions';

export const defaultState = {
  id: null,
  isLoggedIn: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      const { id } = action.payload;
      return {
        ...state,
        id,
        isLoggedIn: true
      };
    case SET_IS_LOGGED_OUT:
      return {
        ...state,
        id: null,
        isLoggedIn: false
      };
    default:
      return state;
  }
};
