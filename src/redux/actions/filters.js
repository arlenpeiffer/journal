import * as types from '../actions';

export const setFilters = filters => {
  return {
    type: types.SET_FILTERS,
    payload: {
      filters
    }
  };
};
