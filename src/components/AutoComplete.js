import React from 'react';
import { Field } from 'formik';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const AutoComplete = ({ dataSource, label, name, ...props }) => {
  return (
    <Field name={name} {...props}>
      {({ field, form, meta }) => {
        const { error } = meta;
        const hasError = error ? true : false;

        const filterOptions = createFilterOptions({
          matchFrom: 'start',
          trim: 'true' // ??
        });

        const handleChange = (event, value) => {
          form.setFieldValue(field.name, value || '');
        };

        const handleInputChange = (event, value) => {
          console.log(event, value);
          const isString = typeof field.value === 'string';

          if (isString) {
            form.setFieldValue(field.name, value);
          }
        };

        const Input = params => (
          <TextField
            error={hasError}
            fullWidth
            helperText={error}
            InputProps={{ ...params.InputProps, type: 'search' }}
            label={label}
            {...params}
          />
        );

        return (
          <MuiAutocomplete
            autoComplete={true}
            // disableClearable
            disableOpenOnFocus
            filterOptions={filterOptions}
            freeSolo
            // inputValue={field.value}
            onChange={handleChange}
            // onInputChange={handleInputChange}
            options={dataSource}
            renderInput={Input}
            value={field.value}
            {...props}
          />
        );
      }}
    </Field>
  );
};

export default AutoComplete;
