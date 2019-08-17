import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';

export default () => {
  const store = createStore(
    rootReducer,
    loadState(),
    composeWithDevTools(applyMiddleware(thunk))
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
