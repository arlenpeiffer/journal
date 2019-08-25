import { SET_IS_LOGGED_IN, SET_IS_LOGGED_OUT } from '../actions';

const defaultState = {
  isLoggedIn: false,
  name: {
    first: 'Callie',
    middle: 'Elissa',
    last: 'Ryan',
    nicknames: ['Bibpu', 'Squinchy', 'Little Buddy'],
    username: 'sexy_spondy'
  },
  password: 'callie11'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true
      };
    case SET_IS_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};
