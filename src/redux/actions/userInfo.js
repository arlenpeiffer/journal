import { SET_IS_LOGGED_IN, SET_IS_LOGGED_OUT } from '../actions';
import { firebase, googleAuthProvider } from '../../firebase';

export const setIsLoggedIn = () => {
  return {
    type: SET_IS_LOGGED_IN
  };
};

export const setIsLoggedOut = () => {
  return {
    type: SET_IS_LOGGED_OUT
  };
};

export const startLogin = () => {
  return () => {
    firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const startLogout = () => {
  return () => {
    firebase.auth().signOut();
  };
};
