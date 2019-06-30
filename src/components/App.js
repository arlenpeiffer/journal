import React from 'react';
import { connect } from 'react-redux';
import DashboardPage from './DashboardPage';
import LoginPage from './LoginPage';

function App(props) {
  const { isLoggedIn } = props;
  return <div>{isLoggedIn ? <DashboardPage /> : <LoginPage />}</div>;
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.userInfo.isLoggedIn
});

export default connect(mapStateToProps)(App);
