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

import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles';
import colors from './constants/colors';

const PageWrapper = styled.div`
  margin-left: 5.5%;
  margin-right: 5.5%;
`;

const store = configureStore();

const defaultTheme = createMuiTheme();

const theme = responsiveFontSizes(
  createMuiTheme({
    breakpoints: {
      values: {
        xs: 0, // default = 0
        sm: 432, // default = 600
        md: 576, // default = 960
        lg: 768, // default = 1280
        xl: 992 // default = 1920
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
      MuiCheckbox: {
        colorSecondary: {
          '&$checked': {
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }
        },
        root: {
          marginRight: defaultTheme.spacing(0.5),
          padding: 0,
          '&:hover': {
            backgroundColor: 'transparent',
            color: colors.purple.main
          }
        }
      },
      MuiToggleButton: {
        root: {
          border: 'none',
          '&:first-child': {
            borderRadius: defaultTheme.shape.borderRadius,
            padding: defaultTheme.spacing(1)
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
          flex: 1,
          margin: defaultTheme.spacing(0.5)
        },
        root: {
          display: 'flex'
        }
      }
    },
    props: {
      MuiCheckbox: {
        disableRipple: true
      },
      MuiToggleButton: {
        disableRipple: true
      }
    }
  })
);

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
