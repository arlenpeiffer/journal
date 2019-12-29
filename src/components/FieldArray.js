import React from 'react';
import { FieldArray as FormikFieldArray, useField } from 'formik';
import styled from 'styled-components';

import ButtonPrimary from './ButtonPrimary';
import Popup from './Popup';

const ArrayItem = styled.div``;

const ItemFields = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldArray = ({ buttonText, children, name, newArrayItem, ...props }) => {
  const [field] = useField(name);

  const RemoveButton = <ButtonPrimary>Remove {buttonText}</ButtonPrimary>;

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
              <Popup
                button={RemoveButton}
                onConfirm={() => arrayHelpers.remove(index)}
                text={`Are you sure you want to remove this ${buttonText.toLowerCase()}?`}
              />
            </ArrayItem>
          ))}
          <ButtonPrimary
            onClick={() => arrayHelpers.push(newArrayItem)}
            variant="outlined"
          >
            Add {buttonText}
          </ButtonPrimary>
        </div>
      )}
    </FormikFieldArray>
  );
};

export default FieldArray;
