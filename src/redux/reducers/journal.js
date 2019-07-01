import { ADD_ENTRY } from '../actions';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return [...state, action.payload.entry];
    default:
      return state;
  }
};
