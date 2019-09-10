import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render Header without navigation if not logged in', () => {
  const wrapper = shallow(<Header isLoggedIn={false} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render Header with naviagtion if logged in', () => {
  const wrapper = shallow(<Header isLoggedIn={true} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call signOut when "Sign out" is clicked', () => {
  const signOut = jest.fn();
  const wrapper = shallow(<Header isLoggedIn={true} signOut={signOut} />);
  wrapper.find('p').simulate('click');
  expect(signOut).toHaveBeenCalled();
});
