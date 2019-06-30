import { SET_IS_LOGGED_IN } from '../actions';

export const setLoggedIn = password => {
  return {
    type: SET_IS_LOGGED_IN,
    payload: password
  };
};
