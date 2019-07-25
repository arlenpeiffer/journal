import {
  SET_END_DATE_FILTER,
  SET_START_DATE_FILTER,
  SORT_BY_NEWEST_FIRST,
  SORT_BY_OLDEST_FIRST
} from '../actions';

const defaultState = {
  sortBy: 'newestFirst',
  text: '',
  startDate: null,
  endDate: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_END_DATE_FILTER:
      const { endDate } = action.payload;
      return {
        ...state,
        endDate
      };
    case SET_START_DATE_FILTER:
      const { startDate } = action.payload;
      return {
        ...state,
        startDate
      };
    case SORT_BY_NEWEST_FIRST:
      return {
        ...state,
        sortBy: 'newestFirst'
      };
    case SORT_BY_OLDEST_FIRST:
      return {
        ...state,
        sortBy: 'oldestFirst'
      };
    default:
      return state;
  }
};
