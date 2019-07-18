import {
  ADD_MOVEMENT,
  ADD_NSAID,
  ADD_SUPPLEMENT,
  REMOVE_SUPPLEMENT
} from '../actions';

export const addMovement = movement => {
  return {
    type: ADD_MOVEMENT,
    payload: { movement }
  };
};

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
