import { SET_DATE_FILTER, SET_SORT_ORDER, SET_TEXT_FILTER } from '../actions';

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
    case SET_DATE_FILTER:
      const { startDate, endDate } = action.payload;
      return {
        ...state,
        date: { startDate, endDate }
      };
    case SET_SORT_ORDER:
      const { sortOrder } = action.payload;
      return {
        ...state,
        sortOrder
      };
    case SET_TEXT_FILTER:
      const { text } = action.payload;
      return {
        ...state,
        text
      };
    default:
      return state;
  }
};
