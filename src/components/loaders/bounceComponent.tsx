import React from 'react';
import { Dialog, Grid } from '@mui/material';
import styled from 'styled-components';

const BounceComponent: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <StyledDialog maxWidth="xs" fullWidth open={open}>
      <Wrapper container justifyContent="space-between" alignItems="flex-end">
        <Grid item className="ball" />
        <Grid item className="ball" />
        <Grid item className="ball" />
        <span>Loading</span>
      </Wrapper>
    </StyledDialog>
  );
};

export default BounceComponent;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paperScrollPaper {
    background-color: var(--header-color);
  }
`;
const Wrapper = styled(Grid)`
  height: 13.675rem;
  align-self: center;
  width: 8.5rem;

  span {
    font-size: 1.5rem;
    font-weight: 900;
    width: 8rem;
    margin: auto;
    color: var(--body-2-color);
  }
  span::after {
    animation: loader 1.5s normal ease infinite;
    content: '';
  }
  .ball {
    width: 1.565rem;
    height: 1.565rem;
    border-radius: 50%;
    background-color: var(--body-2-color);
    animation: bounce 0.5s alternate infinite;
  }

  .ball: nth-child(2) {
    animation-delay: 0.16s;
  }
  .ball: nth-child(3) {
    animation-delay: 0.32s;
  }

  @keyframes bounce {
    from {
      transform: scaleX(1.25);
    }
    to {
      transform: translateY(-50px) scaleX(1);
    }
  }

  @keyframes loader {
    0% {
      content: '';
    }

    33% {
      content: ' .';
    }

    66% {
      content: ' ..';
    }

    100% {
      content: ' ...';
    }
  }
`;
