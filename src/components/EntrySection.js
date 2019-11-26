import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import styled from 'styled-components';

import colors from '../constants/colors';

const Content = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

const Header = styled(CardHeader)`
  background: ${colors.purple.light};
  color: white;
`;

const Section = styled(Card)`
  margin: 1rem 0;
`;

const EntrySection = ({ children, label }) => {
  return (
    <Section>
      <Header title={label} />
      <Content>{children}</Content>
    </Section>
  );
};

export default EntrySection;
