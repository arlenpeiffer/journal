import * as types from '../actions';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_ENTRY_SUCCESS:
      const { entry } = action.payload;
      return [...state, entry];
    case types.EDIT_ENTRY_SUCCESS:
      const { editedEntry } = action.payload;
      return state.map(entry => {
        if (entry.id === action.payload.id) {
          return { ...entry, ...editedEntry };
        } else {
          return entry;
        }
      });
    case types.GET_JOURNAL_SUCCESS:
      const { journal } = action.payload;
      return journal;
    case types.LOGOUT_SUCCESS:
      return defaultState;
    case types.REMOVE_ENTRY_SUCCESS:
      return state.filter(entry => entry.id !== action.payload.id);
    default:
      return state;
  }
};
