import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
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
