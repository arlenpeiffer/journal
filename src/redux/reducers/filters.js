import { RESET_FILTERS, SET_FILTERS } from '../actions';

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
    case RESET_FILTERS:
      return { ...defaultState };
    case SET_FILTERS:
      const { filters } = action.payload;
      return { ...filters };
    default:
      return state;
  }
};
