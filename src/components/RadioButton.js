import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const RadioButton = ({ label, value, ...props }) => (
  <FormControlLabel
    control={<Radio color="primary" />}
    label={label}
    value={value}
    {...props}
  />
);

export default RadioButton;
