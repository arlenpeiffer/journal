import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { startLogin } from '../redux/actions/userInfo';

export function Login(props) {
  const { startLogin } = props;
  return (
    <div>
      <Button onClick={startLogin} type="primary">
        Sign in with Google
      </Button>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(
  undefined,
  mapDispatchToProps
)(Login);
