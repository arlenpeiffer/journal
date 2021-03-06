import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, Formik } from 'formik';
import { Input, Password, Title } from './AntFields';
import { Button, Form, Icon } from 'antd';
import * as Yup from 'yup';

import Error from '../components/Error';
import { resetErrors } from '../redux/actions/errors';
import { addProfile } from '../redux/actions/profile';
import { getErrorMessage } from '../shared';

const initialValues = {
  name: {
    first: '',
    last: ''
  },
  email: '',
  password: '',
  passwordConfirm: ''
};

const validationSchema = Yup.object().shape({
  name: Yup.object().shape({
    first: Yup.string().required('First name is required.'),
    last: Yup.string().required('Last name is required.')
  }),
  email: Yup.string()
    .email('Must be a valid email.')
    .required('Email is required.'),
  password: Yup.string()
    .matches(/^[\S]+$/, 'Sorry, spaces are not allowed in password.')
    .min(6, 'Password must be at least 6 characters long.')
    .required('Password is required.'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords do not match.'
  )
});

function SignUp(props) {
  const { addProfile, error, resetErrors } = props;

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={values => addProfile(values)}
        validationSchema={validationSchema}
        render={({ handleSubmit }) => (
          <div>
            <Title level={4}>Sign up to start journaling!</Title>
            {error ? <Error message={getErrorMessage(error)} /> : null}
            <Form onSubmit={handleSubmit}>
              <Field
                autoComplete="off"
                autoFocus
                component={Input}
                name="name.first"
                placeholder="First Name"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
              <Field
                autoComplete="off"
                component={Input}
                name="name.last"
                placeholder="Last Name"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
              <Field
                autoComplete="off"
                component={Input}
                name="email"
                placeholder="Email"
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
              <Field
                component={Password}
                name="password"
                placeholder="Password"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
              <Field
                component={Password}
                name="passwordConfirm"
                onPressEnter={handleSubmit}
                placeholder="Confirm Password"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
              <Button onClick={handleSubmit} type="primary">
                Sign Up
              </Button>
            </Form>
            <div style={{ marginTop: 24 }}>
              Already have an account?{' '}
              <Link to="/" onClick={error ? resetErrors : null}>
                Sign in!
              </Link>
            </div>
          </div>
        )}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  error: state.ui.errors
});

const mapDispatchToProps = dispatch => ({
  addProfile: (email, password) => dispatch(addProfile(email, password)),
  resetErrors: () => dispatch(resetErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
