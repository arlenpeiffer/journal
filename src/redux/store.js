import { createStore } from 'redux';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';

export default () => {
  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    saveState({
      user: {
        journal: store.getState().user.journal,
        logs: store.getState().user.logs
      }
    });
  });

  return store;
};
