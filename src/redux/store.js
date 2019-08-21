import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { startGetJournal } from '../redux/actions/journal';
import { startGetLogs } from '../redux/actions/logs';

export default () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  store.dispatch(startGetJournal());
  store.dispatch(startGetLogs());
  return store;
};
