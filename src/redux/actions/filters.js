import { SET_DATE_FILTER, SET_SORT_ORDER, SET_TEXT_FILTER } from '../actions';

export const setDateFilter = (startDate, endDate) => {
  return {
    type: SET_DATE_FILTER,
    payload: { startDate, endDate }
  };
};

export const setSortOrder = sortOrder => {
  return {
    type: SET_SORT_ORDER,
    payload: { sortOrder }
  };
};
