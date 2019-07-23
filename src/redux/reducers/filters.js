import { SORT_BY_NEWEST_FIRST, SORT_BY_OLDEST_FIRST } from '../actions';

const defaultState = {
  sortBy: 'newestFirst',
  text: '',
  startDate: '',
  endDate: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
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
