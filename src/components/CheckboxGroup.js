import React from 'react';
import { Field } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckboxIconEmpty from '@material-ui/icons/CheckBoxOutlineBlank';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

import FieldLabel from './FieldLabel';

const CheckboxGroup = ({ dataSource, label, name, ...props }) => {
  return (
    <Field name={name} {...props}>
      {({ form, field, meta }) => {
        const { error } = meta;
        const hasError = error ? true : false;

        const checkedItems = field.value;

        const handleChange = item => (event, value) => {
          form.setFieldValue(
            field.name,
            value
              ? checkedItems.concat(item).sort()
              : checkedItems.filter(i => i !== item).sort()
          );
        };

        return (
          <FormControl error={hasError}>
            <FieldLabel label={label} />
            <FormGroup>
              {dataSource.map(item => {
                const isChecked = field.value.includes(item);

                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        checkedIcon={
                          <CheckboxIcon color="primary" fontSize="small" />
                        }
                        icon={<CheckboxIconEmpty fontSize="small" />}
                        onChange={handleChange(item)}
                        // value={item}
                      />
                    }
                    key={item}
                    label={item}
                    // onChange={handleChange}
                    // value={item}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>{error}</FormHelperText>
            <p>{JSON.stringify(checkedItems)}</p>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default CheckboxGroup;
