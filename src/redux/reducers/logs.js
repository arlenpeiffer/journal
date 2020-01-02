import * as types from '../actions';
import { sortLog } from '../../utils';

const defaultState = {
  appointments: [],
  diets: [],
  food: [], // renamed 'meals', remove
  ingredients: [],
  meals: [],
  medications: [],
  moods: [],
  movement: [], // rename 'movements'
  nsaid: [], // remove
  practitioners: [],
  supplements: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointments: sortLog([
          ...state.appointments,
          action.payload.appointment
        ])
      };
    case types.ADD_FOOD_SUCCESS:
      return {
        ...state,
        food: sortLog([...state.food, action.payload.food])
      };
    case types.ADD_MOVEMENT_SUCCESS:
      return {
        ...state,
        movement: sortLog([...state.movement, action.payload.movement])
      };
    case types.ADD_NSAID_SUCCESS:
      return {
        ...state,
        nsaid: [...state.nsaid, action.payload.nsaid]
      };
    case types.ADD_PRACTITIONER_SUCCESS:
      return {
        ...state,
        practitioners: sortLog([
          ...state.practitioners,
          action.payload.practitioner
        ])
      };
    case types.ADD_SUPPLEMENT_SUCCESS:
      return {
        ...state,
        supplements: sortLog([...state.supplements, action.payload.supplement])
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
