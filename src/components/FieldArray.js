import React from 'react';
import { FieldArray as FormikFieldArray, useField } from 'formik';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const ArrayItem = styled.div``;

const ItemFields = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldArray = ({ buttonText, children, name, newArrayItem, ...props }) => {
  const [field] = useField(name);

  return (
    <FormikFieldArray name={name} {...props}>
      {arrayHelpers => (
        <div>
          {field.value.map((item, index) => (
            <ArrayItem key={index}>
              <ItemFields>
                {React.Children.map(children, child => {
                  const { props } = child;
                  return React.cloneElement(child, {
                    name: `${name}.${index}.${props.field}`
                  });
                })}
              </ItemFields>
              <Button onClick={() => arrayHelpers.remove(index)}>
                Remove {buttonText}
              </Button>
            </ArrayItem>
          ))}
          <Button onClick={() => arrayHelpers.push(newArrayItem)}>
            Add {buttonText}
          </Button>
        </div>
      )}
    </FormikFieldArray>
  );
};

export default FieldArray;
