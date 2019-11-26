import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';

const Label = styled(InputLabel)`
  & + * {
    margin-top: 16px;
  }
`;

const FieldLabel = ({ label }) => <Label shrink>{label}</Label>;

export default FieldLabel;
