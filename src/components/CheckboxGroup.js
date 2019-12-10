import React from 'react';
import { useField, useFormikContext } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import CheckboxIcon from '@material-ui/icons/CheckBox';
import CheckboxIconEmpty from '@material-ui/icons/CheckBoxOutlineBlank';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

import FieldLabel from './FieldLabel';

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

  return (
    <FormControl error={hasError}>
      <FieldLabel label={label} />
      <FormGroup>
        {dataSource.map(item => (
          <FormControlLabel
            control={
              <Checkbox
                checkedIcon={<CheckboxIcon color="primary" />}
                icon={<CheckboxIconEmpty />}
              />
            }
            key={item}
            label={item}
            name={name}
            onBlur={field.onBlur}
            onChange={handleChange}
            value={item}
            {...props}
          />
        ))}
      </FormGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default CheckboxGroup;
