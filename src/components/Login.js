import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Icon, Input } from 'antd';

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
    const { username } = this.props;
    return (
      <div>
        <Form>
          <Form.Item label="Username">
            <Input
              defaultValue={username}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password
              autoFocus
              onChange={this.onChange}
              onPressEnter={this.onSubmit}
              placeholder={message}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              value={value}
            />
          </Form.Item>
          <Button onClick={this.onSubmit}>Enter</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  password: state.user.userInfo.password,
  username: state.user.userInfo.name.username
});

export default connect(mapStateToProps)(Login);
