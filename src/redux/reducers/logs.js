import {
  ADD_MOVEMENT,
  ADD_NSAID,
  ADD_SUPPLEMENT,
  REMOVE_SUPPLEMENT
} from '../actions';

const defaultState = {
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
