import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import Typography from '@material-ui/core/Typography';

import Alert from './Alert';
import ButtonPrimary from './ButtonPrimary';
import Input from './Input';
import { resetErrors } from '../redux/actions/errors';
import { login } from '../redux/actions/user';
import { getErrorMessage } from '../utils';
import { loginSchema } from '../schemas/loginSchema';

const initialValues = {
  email: '',
  password: ''
};

const Login = ({ error, login, resetErrors }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={values => login(values)}
    validationSchema={loginSchema}
  >
    {({ handleSubmit, values }) => {
      const { email, password } = values;

      return (
        <>
          <Typography gutterBottom variant="h1">
            Welcome, please sign in.
          </Typography>
          {error && (
            <Alert
              action={resetErrors}
              message={getErrorMessage(error)}
              variant="error"
            />
          )}
          <Form>
            <Input
              allowReset
              label="Email"
              name="email"
              placeholder="Enter your email"
              resetDependencies={[error]}
              resetValue={!error ? '' : email}
              type="text"
            />
            <Input
              allowReset
              label="Password"
              name="password"
              placeholder="Enter your password"
              resetDependencies={[error]}
              resetValue={!error ? '' : password}
              type="password"
            />
            <ButtonPrimary onClick={handleSubmit}>Sign In</ButtonPrimary>
          </Form>
          <div>
            <Typography>Not a user? </Typography>
            <Link to="/signup" onClick={error && resetErrors}>
              <Typography>Sign up!</Typography>
            </Link>
          </div>
        </>
      );
    }}
  </Formik>
);

const mapStateToProps = state => ({
  error: state.ui.errors
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  resetErrors: () => dispatch(resetErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
