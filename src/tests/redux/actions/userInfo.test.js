import { SET_IS_LOGGED_IN, SET_IS_LOGGED_OUT } from '../../../redux/actions';
import { setIsLoggedIn, setIsLoggedOut } from '../../../redux/actions/userInfo';

test('should generate SET_IS_LOGGED_IN action object', () => {
  const id = 'userId';
  const action = setIsLoggedIn(id);
  expect(action).toEqual({
    type: SET_IS_LOGGED_IN,
    payload: { id }
  });
});

test('should generate SET_IS_LOGGED_OUT action object', () => {
  expect(setIsLoggedOut()).toEqual({ type: SET_IS_LOGGED_OUT });
});
