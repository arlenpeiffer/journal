import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, Formik } from 'formik';
import { Input, Password, Title } from './AntFields';
import { Button, Form, Icon } from 'antd';

import Error from '../components/Error';
import { resetErrors } from '../redux/actions/errors';
import { login } from '../redux/actions/user';
import { getErrorMessage } from '../shared';
import { loginSchema } from '../schemas/loginSchema';

const initialValues = {
  email: '',
  password: ''
};

function Login(props) {
  const { error, login, resetErrors } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        login(values);
      }}
      validationSchema={loginSchema}
      render={({ handleSubmit }) => (
        <div>
          <Title level={4}>Welcome, please sign in.</Title>
          {error ? <Error message={getErrorMessage(error)} /> : null}
          <Form onSubmit={handleSubmit}>
            <Field
              autoComplete="off"
              autoFocus
              component={Input}
              label="Email"
              name="email"
              onPressEnter={handleSubmit}
              placeholder="Email"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            <Field
              autoComplete="off"
              component={Password}
              label="Password"
              name="password"
              onPressEnter={handleSubmit}
              placeholder="Password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            <div style={{ marginBottom: 24 }}>
              Not a user?{' '}
              <Link to="/signup" onClick={error ? resetErrors : null}>
                Sign up!
              </Link>
            </div>
            <Button onClick={handleSubmit} type="primary">
              Sign In
            </Button>
          </Form>
        </div>
      )}
    />
  );
}

const mapStateToProps = state => ({
  error: state.ui.errors
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  resetErrors: () => dispatch(resetErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
