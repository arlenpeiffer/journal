import { ADD_SUPPLEMENT } from '../actions';

export const addSupplement = supplement => {
  return {
    type: ADD_SUPPLEMENT,
    payload: { supplement }
  };
};
