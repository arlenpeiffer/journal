import * as types from '../actions';
import { firebase } from '../../firebase';

export const addProfile = profile => {
  return {
    type: types.ADD_PROFILE,
    payload: { profile }
  };
};

export const startAddProfile = values => {
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
            .then(dispatch(addProfile(profile)));
        });
      });
  };
};

export const requestProfile = () => {
  return {
    type: types.REQUEST_PROFILE
  };
};

export const requestProfileFailure = error => {
  return {
    type: types.REQUEST_PROFILE_FAILURE,
    payload: { error }
  };
};

export const requestProfileSuccess = profile => {
  return {
    type: types.REQUEST_PROFILE_SUCCESS,
    payload: { profile }
  };
};

export const startGetProfile = () => {
  return (dispatch, getState) => {
    const userId = getState().user.profile.id;
    dispatch(requestProfile());
    firebase
      .database()
      .ref(`users/${userId}/profile`)
      .once('value')
      .then(snapshot => {
        const email = snapshot.child('email').val();
        const id = snapshot.child('id').val();
        const name = snapshot.child('name').val();
        const profile = { email, id, name };
        dispatch(requestProfileSuccess(profile));
      });
  };
};

export const login = id => {
  return {
    type: types.LOGIN,
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
    type: types.LOGOUT
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
