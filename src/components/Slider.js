import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiSlider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import FieldLabel from './FieldLabel';

const Slider = ({
  defaultDisplayText,
  formatDisplayText,
  label,
  name,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const [value, setValue] = useState(field.value / 3600000);

  const fieldValueIsWithinRange = field.value >= props.min;
  const valueEqualsMin = value === props.min;

  const displayText = fieldValueIsWithinRange
    ? formatDisplayText(value)
    : defaultDisplayText;

  const generateMarks = (min, max) => {
    if (max === min) {
      return [{ value: min }];
    }
    const marks = generateMarks(min, max - 1);
    marks.push({ value: max });
    return marks;
  };

  const handleBlur = event => {
    if (touched === false) {
      setFieldTouched(field.name, true);
    }
  };

  const handleChange = (event, value) => {
    if (!fieldValueIsWithinRange && valueEqualsMin) {
      setFieldValue(field.name, value * 3600000);
    }
    setValue(value);
  };

  const handleChangeCommitted = (event, value) => {
    setFieldValue(field.name, value * 3600000);
  };

  return (
    <FormControl error={hasError}>
      <FieldLabel label={label} />
      <div>
        <Typography variant="overline">{displayText}</Typography>
        <MuiSlider
          marks={generateMarks(props.min, props.max)}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          value={value}
          {...props}
        />
      </div>
      <FormHelperText>{hasError && error}</FormHelperText>
    </FormControl>
  );
};

export default Slider;
