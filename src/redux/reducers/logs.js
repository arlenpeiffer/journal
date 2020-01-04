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
  practitioners: [],
  supplements: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_APPOINTMENT_SUCCESS: {
      const { appointment } = action.payload;
      const { appointments } = state;
      return {
        ...state,
        appointments: sortLog([...appointments, appointment])
      };
    }

    case types.ADD_DIET_SUCCESS: {
      const { diet } = action.payload;
      const { diets } = state;
      return {
        ...state,
        diets: sortLog([...diets, diet])
      };
    }

    case types.ADD_FOOD_SUCCESS: // ! //
      return {
        ...state,
        food: sortLog([...state.food, action.payload.food])
      };

    case types.ADD_INGREDIENT_SUCCESS: {
      const { ingredient } = action.payload;
      const { ingredients } = state;
      return {
        ...state,
        ingredients: sortLog([...ingredients, ingredient])
      };
    }

    case types.ADD_MEAL_SUCCESS: {
      const { meal } = action.payload;
      const { meals } = state;
      return {
        ...state,
        meals: sortLog([...meals, meal])
      };
    }

    case types.ADD_MEDICATION_SUCCESS: {
      const { medication } = action.payload;
      const { medications } = state;
      return {
        ...state,
        medications: sortLog([...medications, medication])
      };
    }

    case types.ADD_MOOD_SUCCESS: {
      const { mood } = action.payload;
      const { moods } = state;
      return {
        ...state,
        moods: sortLog([...moods, mood])
      };
    }

    case types.ADD_MOVEMENT_SUCCESS: // ! //
      return {
        ...state,
        movement: sortLog([...state.movement, action.payload.movement])
      };

    case types.ADD_PRACTITIONER_SUCCESS: {
      const { practitioner } = action.payload;
      const { practitioners } = state;
      return {
        ...state,
        practitioners: sortLog([...practitioners, practitioner])
      };
    }

    case types.ADD_SUPPLEMENT_SUCCESS: {
      const { supplement } = action.payload;
      const { supplements } = state;
      return {
        ...state,
        supplements: sortLog([...supplements, supplement])
      };
    }

    case types.GET_LOGS_SUCCESS:
      const { logs } = action.payload;
      return logs;

    case types.LOGOUT_SUCCESS:
      return defaultState;

    case types.REMOVE_SUPPLEMENT_SUCCESS: {
      const { supplement } = action.payload;
      const { supplements } = state;
      return {
        ...state,
        supplements: supplements.filter(i => i !== supplement)
      };
    }

    default:
      return state;
  }
};
