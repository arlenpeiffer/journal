import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
// import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiSlider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
// import Typography from '@material-ui/core/Typography';

import FieldLabel from './FieldLabel';

// const Wrapper = styled.div`
//   align-items: flex-start;
//   justify-content: center;
//   display: flex;
//   & > * {
//     flex: 1;
//   }
// `;

// const Display = styled.div`
//   height: 28px;
//   & > * {
//     line-height: 28px !important;
//   }
// `;

const ValueLabel = ({ children, open, value }) => {
  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      PopperProps={{ popperRef }}
      open={open}
      enterTouchDelay={0}
      placement="bottom"
      title={value}
    >
      {children}
    </Tooltip>
  );
};

const Slider = ({
  displayDefault = '',
  displayFormat = () => value,
  label,
  name,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  console.log(field, meta);

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const [value, setValue] = useState(field.value / 3600000);

  // shmeh ?
  const handleBlur = event => {
    if (touched === false) {
      setFieldTouched(field.name, true);
    }
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleChangeCommitted = (event, value) => {
    setFieldValue(field.name, value * 3600000);
  };

  const generateMarks = (min, max) => {
    if (max === min) {
      return [{ value: min }];
    }
    const marks = generateMarks(min, max - 1);
    marks.push({ value: max });
    return marks;
  };

  const displayText =
    value >= props.min ? displayFormat(value) : displayDefault;

  return (
    <FormControl error={hasError}>
      <FieldLabel label={label} />
      {/* <Wrapper> */}
      <MuiSlider
        marks={generateMarks(props.min, props.max)}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        value={value}
        ValueLabelComponent={ValueLabel}
        valueLabelDisplay="on"
        valueLabelFormat={displayText}
        {...props}
      />
      {/* <Display>
          <Typography>{displayText}</Typography>
        </Display> */}
      {/* </Wrapper> */}
      <FormHelperText>{hasError && error}</FormHelperText>
    </FormControl>
  );
};

export default Slider;

Slider.propTypes = {
  displayDefault: PropTypes.string,
  displayFormat: PropTypes.func,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};
