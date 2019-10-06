import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { firebase } from './firebase';

import AppRouter, { history } from './routers/AppRouter';
import { getJournal } from './redux/actions/journal';
import { getLogs } from './redux/actions/logs';
import { getProfile } from './redux/actions/profile';
import { loginSuccess, logout } from './redux/actions/user';

const store = configureStore();

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

const session = firebase.auth.Auth.Persistence.SESSION;
firebase
  .auth()
  .setPersistence(session)
  .then(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push('/view');
        store.dispatch(loginSuccess(user.uid));
        store.dispatch(getJournal());
        store.dispatch(getLogs());
        store.dispatch(getProfile());
      } else {
        history.push('/');
        store.dispatch(logout());
      }
    });
  });
