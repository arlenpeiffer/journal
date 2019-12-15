import React, { useEffect, useRef, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const Input = ({
  allowReset,
  name,
  resetDependencies,
  resetValue,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue, validateField } = useFormikContext();

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const [value, setValue] = useState(field.value);

  const componentIsMounted = useRef(false);

  useEffect(() => {
    if (componentIsMounted.current && allowReset) {
      setValue(resetValue);
      setFieldValue(field.name, resetValue);
      setFieldTouched(field.name, false);
    }
    componentIsMounted.current = true;
  }, resetDependencies);

  const handleBlur = event => {
    field.onBlur(event);
    field.onChange(event);
  };

  const handleChange = event => {
    const valueIsEmptyString = event.target.value === '';
    const valueHasLengthOfOne = event.target.value.length === 1;

    setValue(event.target.value);

    if (valueIsEmptyString || (valueHasLengthOfOne && hasError)) {
      updateAndValidateField(event);
    }
  };

  const updateAndValidateField = event => {
    field.onChange(event);
    validateField(name);
  };

  return (
    <TextField
      autoComplete="off"
      error={hasError}
      fullWidth
      helperText={hasError && error}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      {...props}
    />
  );
};

export default Input;

Input.propTypes = {
  allowReset: PropTypes.bool,
  resetDependencies: PropTypes.array,
  resetValue: PropTypes.string
};
