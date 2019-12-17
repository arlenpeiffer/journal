import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import Typography from '@material-ui/core/Typography';

import Alert from './Alert';
import ButtonPrimary from './ButtonPrimary';
import Input from './Input';
import { resetErrors } from '../redux/actions/errors';
import { addProfile } from '../redux/actions/profile';
import { getErrorMessage } from '../shared';
import { signupSchema } from '../schemas/signupSchema';

const initialValues = {
  name: {
    first: '',
    last: ''
  },
  email: '',
  password: '',
  passwordConfirm: ''
};

const SignUp = ({ addProfile, error, resetErrors }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={values => addProfile(values)}
    validationSchema={signupSchema}
  >
    {({ values }) => {
      const { email, name, password, passwordConfirm } = values;

      return (
        <>
          <Typography gutterBottom variant="h1">
            Sign up to start journaling!
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
              label="First Name"
              name="name.first"
              placeholder="Enter your first name"
              resetDependencies={[error]}
              resetValue={!error ? '' : name.first}
              type="text"
            />
            <Input
              allowReset
              label="Last Name"
              name="name.last"
              placeholder="Enter your last name"
              resetDependencies={[error]}
              resetValue={!error ? '' : name.last}
              type="text"
            />
            <Input
              allowReset
              label="Email"
              name="email"
              placeholder="Enter your email"
              resetDependencies={[error]}
              resetValue={!error ? '' : email}
              type="email"
            />
            <Input
              allowReset
              label="Password"
              name="password"
              placeholder="Enter a password"
              resetDependencies={[error]}
              resetValue={!error ? '' : password}
              type="password"
            />
            <Input
              allowReset
              label="Confirm Password"
              name="passwordConfirm"
              placeholder="Re-enter your password"
              resetDependencies={[error]}
              resetValue={!error ? '' : passwordConfirm}
              type="password"
            />
            <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
          </Form>
          <div style={{ marginTop: 24 }}>
            <Typography>Already have an account? </Typography>
            <Link to="/" onClick={error ? resetErrors : null}>
              <Typography>Sign in!</Typography>
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
  addProfile: (email, password) => dispatch(addProfile(email, password)),
  resetErrors: () => dispatch(resetErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
