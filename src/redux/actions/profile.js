import { ADD_PROFILE, GET_PROFILE, LOGIN, LOGOUT } from '../actions';
import { firebase } from '../../firebase';
import { decrementRequests, incrementRequests } from './requests';

export const addProfile = profile => {
  return {
    type: ADD_PROFILE,
    payload: { profile }
  };
};

export const startAddProfile = values => {
  return dispatch => {
    const { email, name, password } = values;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        const id = user.uid;
        const profile = { email, id, name };
        firebase
          .database()
          .ref(`users/${id}/profile`)
          .set(profile)
          .then(dispatch(addProfile(profile)));
      });
  };
};

export const getProfile = profile => {
  return {
    type: GET_PROFILE,
    payload: { profile }
  };
};

export const startGetProfile = () => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(incrementRequests());
    firebase
      .database()
      .ref(`users/${userId}/profile`)
      .once('value')
      .then(snapshot => {
        const email = snapshot.child('email').val();
        const id = snapshot.child('id').val();
        const name = snapshot.child('name').val();
        const profile = { email, id, name };
        dispatch(getProfile(profile));
        dispatch(decrementRequests());
      });
  };
};

export const login = id => {
  return {
    type: LOGIN,
    payload: { id }
  };
};

export const startLogin = values => {
  const { email, password } = values;
  return () => {
    firebase.auth().signInWithEmailAndPassword(email, password);
    // ? dispatch login() ?
    // .catch(error => console.log(error));
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const startLogout = () => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    if (userId) {
      firebase
        .auth()
        .signOut()
        .then(() => dispatch(logout()));
    }
  };
};
