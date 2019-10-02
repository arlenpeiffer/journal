import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { firebase } from './firebase';

import AppRouter, { history } from './routers/AppRouter';
import { startGetJournal } from './redux/actions/journal';
import { startGetLogs } from './redux/actions/logs';
import { startGetProfile, login, startLogout } from './redux/actions/profile';

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
        store.dispatch(login(user.uid));
        store.dispatch(startGetJournal());
        store.dispatch(startGetLogs());
        store.dispatch(startGetProfile());
      } else {
        history.push('/');
        store.dispatch(startLogout());
      }
    });
  });
