import { ADD_ENTRY, EDIT_ENTRY, GET_JOURNAL, REMOVE_ENTRY } from '../actions';

export const defaultState = [];

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
    case GET_JOURNAL:
      const { journal } = action.payload;
      return journal;
    case REMOVE_ENTRY:
      return state.filter(entry => entry.id !== action.payload.id);
    default:
      return state;
  }
};
