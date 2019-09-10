import { SET_IS_LOGGED_IN, SET_IS_LOGGED_OUT } from '../actions';
import { firebase, googleAuthProvider } from '../../firebase';

export const setIsLoggedIn = id => {
  return {
    type: SET_IS_LOGGED_IN,
    payload: { id }
  };
};

export const setIsLoggedOut = () => {
  return {
    type: SET_IS_LOGGED_OUT
  };
};

export const signInWithGoogle = () => {
  return () => {
    firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const signOut = () => {
  return () => {
    firebase.auth().signOut();
  };
};
