import React from 'react';
import { Grid } from '@mui/material';
import styled from '@mui/styled-engine';

import { DateBar } from '../../components/dateBar';

const HeaderBar: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Container>
      <DateBar />
    </Container>
  );
};
export default HeaderBar;

const Container = styled('div')`
  padding: 1rem;
`;
