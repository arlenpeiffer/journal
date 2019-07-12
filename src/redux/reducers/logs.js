import { ADD_SUPPLEMENT, REMOVE_SUPPLEMENT } from '../actions';

const defaultState = {
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
    case ADD_SUPPLEMENT:
      const { supplement } = action.payload;
      return { ...state, supplements: [...state.supplements, supplement] };
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
