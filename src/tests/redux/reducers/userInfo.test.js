import userInfoReducer, {
  defaultState
} from '../../../redux/reducers/userInfo';
import { SET_IS_LOGGED_IN, SET_IS_LOGGED_OUT } from '../../../redux/actions';
import { userInfo } from '../../testData';

test('should set default state when Redux store initializes', () => {
  const state = userInfoReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(defaultState);
});

test('should set new userInfo state when SET_IS_LOGGED_IN action is dispatched', () => {
  const { id } = userInfo;
  const action = {
    type: SET_IS_LOGGED_IN,
    payload: { id }
  };
  const state = userInfoReducer(defaultState, action);
  expect(state).toEqual(userInfo);
});

test('should reset userInfo state to default when SET_IS_LOGGED_OUT action is dispatched', () => {
  const action = {
    type: SET_IS_LOGGED_OUT
  };
  const state = userInfoReducer(userInfo, action);
  expect(state).toEqual(defaultState);
});
