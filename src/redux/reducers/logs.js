import {
  ADD_FOOD,
  ADD_MOVEMENT,
  ADD_NSAID,
  ADD_SUPPLEMENT,
  GET_LOGS,
  REMOVE_SUPPLEMENT
} from '../actions';

export const defaultState = {
  food: [],
  movement: [],
  nsaid: [],
  supplements: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_FOOD:
      const { food } = action.payload;
      return {
        ...state,
        food: [...state.food, food].sort()
      };
    case ADD_MOVEMENT:
      const { movement } = action.payload;
      return {
        ...state,
        movement: [...state.movement, movement].sort()
      };
    case ADD_NSAID:
      const { nsaid } = action.payload;
      return {
        ...state,
        nsaid: [...state.nsaid, nsaid]
      };
    case ADD_SUPPLEMENT:
      const { supplement } = action.payload;
      return {
        ...state,
        supplements: [...state.supplements, supplement]
      };
    case GET_LOGS:
      const { logs } = action.payload;
      return logs;
    case REMOVE_SUPPLEMENT:
      const removedSupplement = action.payload.supplement;
      return {
        ...state,
        supplements: state.supplements.filter(
          supplement => supplement !== removedSupplement
        )
      };
    default:
      return state;
  }
};
