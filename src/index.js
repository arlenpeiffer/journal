import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { firebase } from './firebase';

import AppRouter from './routers/AppRouter';
import { startGetJournal } from './redux/actions/journal';
import { startGetLogs } from './redux/actions/logs';
import { setIsLoggedIn, setIsLoggedOut } from './redux/actions/userInfo';

const store = configureStore();

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('login', user.uid);
    store.dispatch(setIsLoggedIn());
    store.dispatch(startGetJournal());
    store.dispatch(startGetLogs());
  } else {
    console.log('logout');
    store.dispatch(setIsLoggedOut());
  }
});
