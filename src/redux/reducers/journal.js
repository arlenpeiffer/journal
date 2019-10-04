import * as types from '../actions';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_ENTRY:
      const { entry } = action.payload;
      return [...state, entry];
    case types.EDIT_ENTRY:
      const { editedEntry } = action.payload;
      return state.map(entry => {
        if (entry.id === action.payload.id) {
          return { ...entry, ...editedEntry };
        } else {
          return entry;
        }
      });
    case types.LOGOUT:
      return defaultState;
    case types.REMOVE_ENTRY:
      return state.filter(entry => entry.id !== action.payload.id);
    case types.REQUEST_JOURNAL_SUCCESS:
      const { journal } = action.payload;
      return journal;
    default:
      return state;
  }
};
