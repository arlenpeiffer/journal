import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  state = {
    error: false,
    message: 'Please enter the password',
    value: ''
  };
  onChange = event => {
    const value = event.target.value;
    this.setState({ value });
  };
  onSubmit = event => {
    event.preventDefault();
    const { value } = this.state;
    const { password } = this.props;
    if (value === password) {
      this.props.onSubmit(value);
    } else {
      this.setState({
        error: true,
        message: 'uh oh try again :)',
        value: ''
      });
    }
  };
  render() {
    const { message, value } = this.state;
    return (
      <div>
        <p>{`Hello ${this.props.username}`}</p>
        <p>{message}</p>
        <form onSubmit={this.onSubmit}>
          <input autoFocus onChange={this.onChange} value={value} />
          <button>Enter</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  password: state.user.userInfo.password,
  username: state.user.userInfo.name.username
});

export default connect(mapStateToProps)(Login);
