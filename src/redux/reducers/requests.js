import * as types from '../actions';

const defaultState = 0;

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_APPOINTMENT_REQUEST:
    case types.ADD_DIET_REQUEST:
    case types.ADD_ENTRY_REQUEST:
    case types.ADD_FOOD_REQUEST:
    case types.ADD_INGREDIENT_REQUEST:
    case types.ADD_MEAL_REQUEST:
    case types.ADD_MEDICATION_REQUEST:
    case types.ADD_MOOD_REQUEST:
    case types.ADD_MOVEMENT_REQUEST:
    case types.ADD_NSAID_REQUEST:
    case types.ADD_PRACTITIONER_REQUEST:
    case types.ADD_PROFILE_REQUEST:
    case types.ADD_SUPPLEMENT_REQUEST:
    case types.EDIT_ENTRY_REQUEST:
    case types.GET_JOURNAL_REQUEST:
    case types.GET_LOGS_REQUEST:
    case types.GET_PROFILE_REQUEST:
    case types.LOGIN_REQUEST:
    case types.LOGOUT_REQUEST:
    case types.REMOVE_ENTRY_REQUEST:
    case types.REMOVE_SUPPLEMENT_REQUEST:
      return state + 1;
    case types.ADD_APPOINTMENT_SUCCESS:
    case types.ADD_APPOINTMENT_FAILURE:
    case types.ADD_DIET_SUCCESS:
    case types.ADD_DIET_FAILURE:
    case types.ADD_ENTRY_SUCCESS:
    case types.ADD_ENTRY_FAILURE:
    case types.ADD_FOOD_SUCCESS:
    case types.ADD_FOOD_FAILURE:
    case types.ADD_INGREDIENT_SUCCESS:
    case types.ADD_INGREDIENT_FAILURE:
    case types.ADD_MEAL_SUCCESS:
    case types.ADD_MEAL_FAILURE:
    case types.ADD_MEDICATION_SUCCESS:
    case types.ADD_MEDICATION_FAILURE:
    case types.ADD_MOOD_SUCCESS:
    case types.ADD_MOOD_FAILURE:
    case types.ADD_MOVEMENT_SUCCESS:
    case types.ADD_MOVEMENT_FAILURE:
    case types.ADD_NSAID_SUCCESS:
    case types.ADD_NSAID_FAILURE:
    case types.ADD_PRACTITIONER_SUCCESS:
    case types.ADD_PRACTITIONER_FAILURE:
    case types.ADD_PROFILE_SUCCESS:
    case types.ADD_PROFILE_FAILURE:
    case types.ADD_SUPPLEMENT_SUCCESS:
    case types.ADD_SUPPLEMENT_FAILURE:
    case types.EDIT_ENTRY_SUCCESS:
    case types.EDIT_ENTRY_FAILURE:
    case types.GET_JOURNAL_SUCCESS:
    case types.GET_JOURNAL_FAILURE:
    case types.GET_LOGS_SUCCESS:
    case types.GET_LOGS_FAILURE:
    case types.GET_PROFILE_SUCCESS:
    case types.GET_PROFILE_FAILURE:
    case types.LOGIN_SUCCESS:
    case types.LOGIN_FAILURE:
    case types.LOGOUT_SUCCESS:
    case types.LOGOUT_FAILURE:
    case types.REMOVE_ENTRY_SUCCESS:
    case types.REMOVE_ENTRY_FAILURE:
    case types.REMOVE_SUPPLEMENT_SUCCESS:
    case types.REMOVE_SUPPLEMENT_FAILURE:
      return state - 1;
    default:
      return state;
  }
};
