import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import Typography from '@material-ui/core/Typography';

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

const SignUp = ({ addProfile, error, resetErrors }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => addProfile(values)}
      validationSchema={signupSchema}
    >
      {({ handleSubmit }) => (
        <>
          <Typography gutterBottom variant="h1">
            Sign up to start journaling!
          </Typography>
          <Form>
            <Input
              label="First Name"
              name="name.first"
              placeholder="Enter your first name"
              type="text"
            />
            <Input
              label="Last Name"
              name="name.last"
              placeholder="Enter your last name"
              type="text"
            />
            <Input
              label="Email"
              name="email"
              placeholder="Enter your email"
              type="email"
            />
            <Input
              label="Password"
              name="password"
              placeholder="Enter a password"
              type="password"
            />
            <Input
              label="Confirm Password"
              name="passwordConfirm"
              placeholder="Re-enter your password"
              type="password"
            />
            <ButtonPrimary onClick={handleSubmit}>Sign Up</ButtonPrimary>
          </Form>
          <div style={{ marginTop: 24 }}>
            <Typography>Already have an account? </Typography>
            <Link to="/" onClick={error ? resetErrors : null}>
              <Typography>Sign in!</Typography>
            </Link>
          </div>
        </>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  error: state.ui.errors
});

const mapDispatchToProps = dispatch => ({
  addProfile: (email, password) => dispatch(addProfile(email, password)),
  resetErrors: () => dispatch(resetErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
