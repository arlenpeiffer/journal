import { SET_IS_LOGGED_IN } from '../actions';

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
      if (action.payload.password === state.password) {
        return {
          ...state,
          isLoggedIn: true
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
