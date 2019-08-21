import {
  ADD_FOOD,
  ADD_MOVEMENT,
  ADD_NSAID,
  ADD_SUPPLEMENT,
  GET_LOGS,
  REMOVE_SUPPLEMENT
} from '../actions';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_FOOD:
      return {
        ...state,
        food: [...state.food, action.payload.food].sort()
      };
    case ADD_MOVEMENT:
      return {
        ...state,
        movement: [...state.movement, action.payload.movement].sort()
      };
    case ADD_NSAID:
      return { ...state, nsaid: [...state.nsaid, action.payload.nsaid] };
    case ADD_SUPPLEMENT:
      return {
        ...state,
        supplements: [...state.supplements, action.payload.supplement]
      };
    case GET_LOGS:
      const { logs } = action.payload;
      return logs;
    case REMOVE_SUPPLEMENT:
      return {
        ...state,
        supplements: state.supplements.filter(
          supplement => supplement !== action.payload.supplement
        )
      };
    default:
      return state;
  }
};
