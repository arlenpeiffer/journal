import { SORT_BY_NEWEST_FIRST, SORT_BY_OLDEST_FIRST } from '../actions';

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
