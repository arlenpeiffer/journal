import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, Formik } from 'formik';
import { Input, Password } from './AntFields';
import { Button, Form, Icon } from 'antd';
import * as Yup from 'yup';

import { login } from '../redux/actions/user';

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required.'),
  password: Yup.string().required('Password is required.')
});

function Login(props) {
  const { login } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        login(values);
      }}
      validationSchema={validationSchema}
      render={({ handleSubmit }) => (
        <div>
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
              Not a user? <Link to="/signup">Sign up!</Link>
            </div>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </Form>
        </div>
      )}
    />
  );
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
