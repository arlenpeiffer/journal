import React from 'react';
import { connect } from 'react-redux';
import DashboardPage from './DashboardPage';
import LoginPage from './LoginPage';

function App(props) {
  const { loggedIn } = props;
  return <div>{loggedIn ? <DashboardPage /> : <LoginPage />}</div>;
}

const mapStateToProps = state => ({
  loggedIn: state.user.userInfo.loggedIn
});

export default connect(mapStateToProps)(App);
