import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { signInWithGoogle } from '../redux/actions/userInfo';

export function Login(props) {
  const { signInWithGoogle } = props;
  return (
    <div>
      <Button onClick={signInWithGoogle} type="primary">
        Sign in with Google
      </Button>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  signInWithGoogle: () => dispatch(signInWithGoogle())
});

export default connect(
  undefined,
  mapDispatchToProps
)(Login);
