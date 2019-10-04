import * as types from '../actions';

const defaultState = {
  date: {
    startDate: null,
    endDate: null
  },
  sortOrder: 'newestFirst',
  text: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.RESET_FILTERS:
      return { ...defaultState };
    case types.SET_FILTERS:
      const { filters } = action.payload;
      return { ...filters };
    default:
      return state;
  }
};
