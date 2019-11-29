import React from 'react';
import { FieldArray as FormikFieldArray, useField } from 'formik';
import Button from '@material-ui/core/Button';

const FieldArray = ({ children, label, name, newField }) => {
  const [field, meta] = useField(name);

  return (
    <FormikFieldArray name={name}>
      {arrayHelpers => (
        <div>
          {field.value.map((item, index) => (
            <div key={index}>
              {React.Children.map(children, child => {
                const { props } = child;
                return React.cloneElement(child, {
                  name: `${name}.${index}.${props.field}`
                });
              })}
              <Button onClick={() => arrayHelpers.remove(index)}>Remove</Button>
            </div>
          ))}
          <Button onClick={() => arrayHelpers.push(newField)}>
            Add {label}
          </Button>
        </div>
      )}
    </FormikFieldArray>
  );
};

export default FieldArray;
