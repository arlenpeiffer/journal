const initialState = {
  loggedIn: false,
  name: {
    first: 'Callie',
    middle: 'Elissa',
    last: 'Ryan',
    nicknames: ['Bibpu', 'Squinchy', 'Little Buddy'],
    username: 'sexy_spondy'
  },
  password: 'callie11'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      if (action.payload === state.password) {
        return {
          ...state,
          loggedIn: true
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
