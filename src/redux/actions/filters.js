import { RESET_FILTERS, SET_FILTERS } from '../actions';

export const resetFilters = () => {
  return {
    type: RESET_FILTERS
  };
};

export const setFilters = ({ endDate, sortOrder, startDate, text }) => {
  return {
    type: SET_FILTERS,
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
