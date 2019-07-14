import { ADD_NSAID, ADD_SUPPLEMENT, REMOVE_SUPPLEMENT } from '../actions';

export const addNsaid = nsaid => {
  return {
    type: ADD_NSAID,
    payload: { nsaid }
  };
};

export const addSupplement = supplement => {
  return {
    type: ADD_SUPPLEMENT,
    payload: { supplement }
  };
};

export const removeSupplement = supplement => {
  return {
    type: REMOVE_SUPPLEMENT,
    payload: { supplement }
  };
};
