import {
  ADD_ENTRY,
  EDIT_ENTRY,
  LOGOUT,
  REMOVE_ENTRY,
  REQUEST_JOURNAL_SUCCESS
} from '../actions';

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
    case LOGOUT:
      return defaultState;
    case REMOVE_ENTRY:
      return state.filter(entry => entry.id !== action.payload.id);
    case REQUEST_JOURNAL_SUCCESS:
      const { journal } = action.payload;
      return journal;
    default:
      return state;
  }
};
