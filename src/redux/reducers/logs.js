import * as types from '../actions';

const defaultState = {
  appointments: [],
  food: [],
  movement: [],
  nsaid: [],
  practitioners: [],
  supplements: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [...state.appointments, action.payload.appointment].sort()
      };
    case types.ADD_FOOD:
      return {
        ...state,
        food: [...state.food, action.payload.food].sort()
      };
    case types.ADD_MOVEMENT:
      return {
        ...state,
        movement: [...state.movement, action.payload.movement].sort()
      };
    case types.ADD_NSAID:
      return {
        ...state,
        nsaid: [...state.nsaid, action.payload.nsaid]
      };
    case types.ADD_PRACTITIONER:
      return {
        ...state,
        practitioners: [
          ...state.practitioners,
          action.payload.practitioner
        ].sort()
      };
    case types.ADD_SUPPLEMENT:
      return {
        ...state,
        supplements: [...state.supplements, action.payload.supplement]
      };
    case types.LOGOUT:
      return defaultState;
    case types.REMOVE_SUPPLEMENT:
      return {
        ...state,
        supplements: state.supplements.filter(
          supplement => supplement !== action.payload.supplement
        )
      };
    case types.REQUEST_LOGS_SUCCESS:
      const { logs } = action.payload;
      return logs;
    default:
      return state;
  }
};
