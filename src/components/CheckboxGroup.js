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
import Typography from '@material-ui/core/Typography';

import FieldLabel from './FieldLabel';

const CheckboxWithLabel = styled(FormControlLabel)`
  margin: 0px !important;
  max-width: 95%;
  & > :last-child {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const CheckboxGroup = ({ dataSource, emptyPrompt, label, name, ...props }) => {
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

  const dataSourceIsEmpty = dataSource.length === 0 || !dataSource;

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
          {dataSourceIsEmpty ? (
            <Typography color="textSecondary" variant="body2">
              <i>{emptyPrompt}</i>
            </Typography>
          ) : (
            dataSource.map(item => (
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
            ))
          )}
        </Grid>
      </FormGroup>
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default CheckboxGroup;
