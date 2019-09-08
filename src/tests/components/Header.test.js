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

test('should call startLogout when "Sign out" is clicked', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(
    <Header isLoggedIn={true} startLogout={startLogout} />
  );
  wrapper.find('p').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
