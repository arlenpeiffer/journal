import React from 'react';
import { useField, useFormikContext } from 'formik';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import styled from 'styled-components';

import FieldLabel from './FieldLabel';

const ToggleButtonGroup = styled(MuiToggleButtonGroup)`
  display: flex;
  flex-direction: ${props => props.flexdirection};
`;

const Toggle = ({ children, label, name, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const theme = useTheme();
  const flexDirection = useMediaQuery(theme.breakpoints.up('sm'))
    ? 'row'
    : 'column';

  // TODO: not working when you select and deselect the same value //
  const handleBlur = event => {
    if (touched === false) {
      setFieldTouched(field.name, true);
    }
  };

  const handleChange = (event, value) => {
    setFieldValue(field.name, value);
  };

  return (
    <FormControl error={hasError}>
      <FieldLabel label={label} />
      <ToggleButtonGroup
        flexdirection={flexDirection}
        onBlur={handleBlur}
        onChange={handleChange}
        size="small"
        value={field.value}
        {...props}
      >
        {children}
      </ToggleButtonGroup>
      <FormHelperText>{hasError && error}</FormHelperText>
    </FormControl>
  );
};

export default Toggle;
