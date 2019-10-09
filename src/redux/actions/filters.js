import * as types from '../actions';

export const resetFilters = () => {
  return {
    type: types.RESET_FILTERS
  };
};

export const setFilters = ({ endDate, sortOrder, startDate, text }) => {
  return {
    type: types.SET_FILTERS,
    payload: {
      filters: {
        date: {
          startDate,
          endDate
        },
        sortOrder,
        text
      }
    }
  };
};
