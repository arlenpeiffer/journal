import * as types from '../actions';
import { firebase } from '../../firebase';

export const loginRequest = () => {
  return {
    type: types.LOGIN_REQUEST
  };
};

export const loginSuccess = id => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: { id }
  };
};

export const loginFailure = error => {
  return {
    type: types.LOGIN_FAILURE,
    payload: { error }
  };
};

export const login = values => {
  const { email, password } = values;
  return dispatch => {
    dispatch(loginRequest());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // * loginRequest() is called in src/index.js
      .catch(error => dispatch(loginFailure(error)));
  };
};

export const logoutRequest = () => {
  return {
    type: types.LOGOUT_REQUEST
  };
};

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS
  };
};

export const logoutFailure = error => {
  return {
    type: types.LOGOUT_FAILURE,
    payload: { error }
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    if (userId) {
      dispatch(logoutRequest());
      firebase
        .auth()
        .signOut()
        .then(() => {
          dispatch(logoutSuccess());
        })
        .catch(error => dispatch(logoutFailure(error)));
    }
  };
};
