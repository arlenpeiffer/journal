import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Login from './Login';
import { setLoggedIn } from '../redux/actions/userInfo';

class LoginPage extends React.Component {
  onSubmit = password => {
    this.props.setLoggedIn(password);
  };
  render() {
    return (
      <div>
        <Header />
        <Login onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setLoggedIn: password => dispatch(setLoggedIn(password))
});

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);
