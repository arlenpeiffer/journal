import { ADD_SUPPLEMENT } from '../actions';

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
    default:
      return state;
  }
};
