import {
  SET_END_DATE_FILTER,
  SET_START_DATE_FILTER,
  SORT_BY_NEWEST_FIRST,
  SORT_BY_OLDEST_FIRST
} from '../actions';

export const setEndDateFilter = endDate => {
  return {
    type: SET_END_DATE_FILTER,
    payload: { endDate }
  };
};

export const setStartDateFilter = startDate => {
  return {
    type: SET_START_DATE_FILTER,
    payload: { startDate }
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
