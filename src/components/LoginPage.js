import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Login from './Login';
import { setIsLoggedIn } from '../redux/actions/userInfo';

class LoginPage extends React.Component {
  onSubmit = password => {
    this.props.setIsLoggedIn(password);
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
  setIsLoggedIn: password => dispatch(setIsLoggedIn(password))
});

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);
