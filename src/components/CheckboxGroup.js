import React from 'react';
import { useField, useFormikContext } from 'formik';
import styled from 'styled-components';
import CheckboxEmpty from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckboxFilled from '@material-ui/icons/CheckBox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import MuiCheckbox from '@material-ui/core/Checkbox';

import FieldLabel from './FieldLabel';

const CheckboxWithLabel = styled(FormControlLabel)`
  span {
    &.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1 {
      font-size: 14px;
    }
  }
`;

const CheckboxGroup = ({ dataSource, label, name, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const { error, touched } = meta;
  const hasError = error && touched ? true : false;

  const handleChange = event => {
    const checkedItem = event.target.value;
    const checkedItems = field.value;
    const isChecked = event.target.checked;

    setFieldValue(
      field.name,
      isChecked
        ? checkedItems.concat(checkedItem).sort()
        : checkedItems.filter(item => item !== checkedItem).sort()
    );
  };

  const Checkbox = (
    <MuiCheckbox
      checkedIcon={<CheckboxFilled color="primary" fontSize="small" />}
      icon={<CheckboxEmpty fontSize="small" />}
    />
  );

  return (
    <FormControl error={hasError}>
      <FieldLabel label={label} />
      <FormGroup>
        <Grid container>
          {dataSource.map(item => (
            <Grid item key={item} xs={6} md={4} lg={3} xl={2}>
              <CheckboxWithLabel
                control={Checkbox}
                key={item}
                label={item}
                name={name}
                onBlur={field.onBlur}
                onChange={handleChange}
                value={item}
                {...props}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
      <FormHelperText>{hasError && error}</FormHelperText>
    </FormControl>
  );
};

export default CheckboxGroup;
