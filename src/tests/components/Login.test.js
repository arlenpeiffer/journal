import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../components/Login';

test('should render Login correctly', () => {
  const wrapper = shallow(<Login />);
  expect(wrapper).toMatchSnapshot();
});

test('should call signInWithGoogle when button is clicked', () => {
  const signInWithGoogle = jest.fn();
  const wrapper = shallow(<Login signInWithGoogle={signInWithGoogle} />);
  wrapper.find('Button').simulate('click');
  expect(signInWithGoogle).toHaveBeenCalled();
});
