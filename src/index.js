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
import colors from './constants/colors';

const PageWrapper = styled.div`
  margin-left: 5.5%;
  margin-right: 5.5%;
`;

const store = configureStore();

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0, // default = 0
      sm: 432, // default = 600
      md: 960, // default = 960
      lg: 1280, // default = 1280
      xl: 1920 // default = 1920
    }
  },
  palette: {
    primary: {
      dark: colors.purple.dark,
      main: colors.purple.main,
      light: colors.purple.light
    }
    // secondary: decide on color
  },
  overrides: {
    MuiToggleButton: {
      root: {
        border: 'none',
        // display: 'flex',
        '&:first-child': {
          borderRadius: defaultTheme.shape.borderRadius
          // padding: defaultTheme.spacing(1)
        },
        '&:not(:first-child)': {
          borderRadius: defaultTheme.shape.borderRadius,
          margin: defaultTheme.spacing(0.5),
          padding: defaultTheme.spacing(1)
        },
        '&$selected': {
          color: colors.purple.main
        }
      }
    },
    MuiToggleButtonGroup: {
      groupedSizeSmall: {
        // display: 'flex',
        flex: 1,
        margin: defaultTheme.spacing(0.5)
        // padding: defaultTheme.spacing(1)
      },
      root: {
        display: 'flex'
        // flex: 1
      }
    }
  },
  props: {
    MuiToggleButton: {
      disableRipple: true
    }
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
