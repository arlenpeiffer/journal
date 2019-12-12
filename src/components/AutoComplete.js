import React, { useRef } from 'react';
import { useField, useFormikContext } from 'formik';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const AutoComplete = ({ dataSource, label, name, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const inputRef = useRef(field.value);

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    trim: 'true'
  });

  const handleBlur = event => {
    field.onBlur(event);

    if (!props.multiple) {
      setFieldValue(field.name, inputRef.current.value);
    }
  };

  const handleChange = (event, value) => {
    setFieldValue(field.name, value);
  };

  const handleInputChange = (event, value) => {
    if (!props.multiple) {
      const valueIsEmptyString = value === '';

      if (valueIsEmptyString) {
        setFieldValue(field.name, value);
      }
    }
  };

  const Input = params => (
    <TextField
      error={hasError}
      fullWidth
      helperText={hasError && error}
      InputProps={{ ...params.InputProps, type: 'search' }}
      inputRef={inputRef}
      label={label}
      {...params}
    />
  );

  return (
    <MuiAutocomplete
      autoComplete={true}
      disableClearable
      disableOpenOnFocus
      filterOptions={filterOptions}
      freeSolo
      id={name} // Required by Material-UI
      onBlur={handleBlur}
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={dataSource}
      renderInput={Input}
      value={field.value}
      {...props}
    />
  );
};

export default AutoComplete;
