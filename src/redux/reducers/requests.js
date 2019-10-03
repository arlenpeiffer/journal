const defaultState = 0;

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'DECREMENT_REQUESTS':
      return state - 1;
    case 'INCREMENT_REQUESTS':
      return state + 1;
    default:
      return state;
  }
};
