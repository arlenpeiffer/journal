import * as types from '../actions';
import { firebase } from '../../firebase';

// ADD_PROFILE //
export const addProfileRequest = () => {
  return {
    type: types.ADD_PRACTITIONER_REQUEST
  };
};

export const addProfileSuccess = profile => {
  return {
    type: types.ADD_PROFILE_SUCCESS,
    payload: { profile }
  };
};

export const addProfileFailure = error => {
  return {
    type: types.ADD_PROFILE_FAILURE,
    payload: { error }
  };
};

export const addProfile = values => {
  return dispatch => {
    const { email, name, password } = values;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().onAuthStateChanged(user => {
          const id = user.uid;
          const profile = { email, id, name };
          firebase
            .database()
            .ref(`users/${id}/profile`)
            .set(profile)
            .then(dispatch(addProfileSuccess(profile)));
        });
      });
  };
};

// GET_PROFILE //
export const getProfileRequest = () => {
  return {
    type: types.GET_PROFILE_REQUEST
  };
};

export const getProfileSuccess = profile => {
  return {
    type: types.GET_PROFILE_SUCCESS,
    payload: { profile }
  };
};

export const getProfileFailure = error => {
  return {
    type: types.GET_PROFILE_FAILURE,
    payload: { error }
  };
};

export const getProfile = () => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(getProfileRequest());
    firebase
      .database()
      .ref(`users/${userId}/profile`)
      .once('value')
      .then(snapshot => {
        const email = snapshot.child('email').val();
        const id = snapshot.child('id').val();
        const name = snapshot.child('name').val();
        const profile = { email, id, name };
        dispatch(getProfileSuccess(profile));
      });
  };
};

export const login = id => {
  return {
    type: types.LOGIN_SUCCESS,
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
    type: types.LOGOUT_SUCCESS
  };
};

export const startLogout = () => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    if (userId) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          dispatch(logout());
        });
    }
  };
};
