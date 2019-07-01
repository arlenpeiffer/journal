import { ADD_ENTRY, EDIT_ENTRY } from '../actions';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      const { entry } = action.payload;
      return [...state, entry];
    case EDIT_ENTRY:
      const { editedEntry } = action.payload;
      return state.map(entry => {
        if (entry.id === action.payload.id) {
          return { ...entry, ...editedEntry };
        } else {
          return entry;
        }
      });
    default:
      return state;
  }
};
