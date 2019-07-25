import {
  SET_DATE_FILTER,
  SORT_BY_NEWEST_FIRST,
  SORT_BY_OLDEST_FIRST
} from '../actions';

export const setDateFilter = (startDate, endDate) => {
  return {
    type: SET_DATE_FILTER,
    payload: { startDate, endDate }
  };
};

export const sortByNewestFirst = () => {
  return {
    type: SORT_BY_NEWEST_FIRST
  };
};

export const sortByOldestFirst = () => {
  return {
    type: SORT_BY_OLDEST_FIRST
  };
};
