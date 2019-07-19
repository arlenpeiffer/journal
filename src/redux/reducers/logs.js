import {
  ADD_FOOD,
  ADD_MOVEMENT,
  ADD_NSAID,
  ADD_SUPPLEMENT,
  REMOVE_SUPPLEMENT
} from '../actions';

const defaultState = {
  food: [],
  movement: [],
  nsaid: ['Advil', 'Aleve'],
  supplements: [
    'Cod Liver Oil',
    'Magnesium',
    'MSM',
    'Vitamin D3',
    "Lion's Mane",
    'Cordyceps'
  ]
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_FOOD:
      if (state.food.find(food => food === action.payload.food)) {
        return { ...state };
      } else {
        return {
          ...state,
          food: [...state.food, action.payload.food].sort()
        };
      }
    case ADD_MOVEMENT:
      if (
        state.movement.find(movement => movement === action.payload.movement)
      ) {
        return { ...state };
      } else {
        return {
          ...state,
          movement: [...state.movement, action.payload.movement].sort()
        };
      }
    case ADD_NSAID:
      return { ...state, nsaid: [...state.nsaid, action.payload.nsaid] };
    case ADD_SUPPLEMENT:
      return {
        ...state,
        supplements: [...state.supplements, action.payload.supplement]
      };
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
