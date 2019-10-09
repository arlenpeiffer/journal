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
    case types.ADD_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointments: [...state.appointments, action.payload.appointment].sort()
      };
    case types.ADD_FOOD_SUCCESS:
      return {
        ...state,
        food: [...state.food, action.payload.food].sort()
      };
    case types.ADD_MOVEMENT_SUCCESS:
      return {
        ...state,
        movement: [...state.movement, action.payload.movement].sort()
      };
    case types.ADD_NSAID_SUCCESS:
      return {
        ...state,
        nsaid: [...state.nsaid, action.payload.nsaid]
      };
    case types.ADD_PRACTITIONER_SUCCESS:
      return {
        ...state,
        practitioners: [
          ...state.practitioners,
          action.payload.practitioner
        ].sort()
      };
    case types.ADD_SUPPLEMENT_SUCCESS:
      return {
        ...state,
        supplements: [...state.supplements, action.payload.supplement]
      };
    case types.GET_LOGS_SUCCESS:
      const { logs } = action.payload;
      return logs;
    case types.LOGOUT_SUCCESS:
      return defaultState;
    case types.REMOVE_SUPPLEMENT_SUCCESS:
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
