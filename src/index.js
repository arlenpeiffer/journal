import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import configureStore from './redux/store';
import { firebase } from './firebase';

import AppRouter, { history } from './routers/AppRouter';
import { getJournal } from './redux/actions/journal';
import { getLogs } from './redux/actions/logs';
import { getProfile } from './redux/actions/profile';
import { loginSuccess, logout } from './redux/actions/user';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const PageWrapper = styled.div`
  margin-left: 5.5%;
  margin-right: 5.5%;
`;

const store = configureStore();

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0, // default = 0
      sm: 400, // default = 600
      md: 960, // default = 960
      lg: 1280, // default = 1280
      xl: 1920 // default = 1920
    }
  },
  palette: {
    primary: {
      dark: '#4300A6',
      main: '#6100EE',
      light: '#8033F1'
    }
    // secondary: decide on color
  }
  // status: {
  //   danger: 'orange'
  // }
});

const app = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <AppRouter />
      </PageWrapper>
    </ThemeProvider>
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
        history.push('/add');
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
