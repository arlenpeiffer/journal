import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import styled from 'styled-components';

import colors from '../constants/colors';

const Header = styled(CardHeader)`
  background: ${colors.purple.light};
  color: white;
`;

const EntrySection = ({ children, label }) => {
  return (
    <Card>
      <Header title={label} />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default EntrySection;
