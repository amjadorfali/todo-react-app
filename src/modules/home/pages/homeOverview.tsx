import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Grid, Typography, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

import { ReactComponent as TodoIcon } from 'assets/svgs/homepage/todo.svg';
// import { device } from "utils/helpers/device";

// interface IProps {
//   open: boolean;
//   onFormSubmit: (value: string) => void;
// }
const slideIn = {
  visible: { opacity: 1, scale: [0.5, 1] },
  hidden: { opacity: 0 },
};

const MainPage: React.FC<React.PropsWithChildren<{ openTodosApp: () => void }>> = ({ openTodosApp }) => {
  return (
    <StyledWrapper container justifyContent="center">
      <StyledContainer item xs={12} sm={7} initial="hidden" animate="visible" transition={{ duration: 1 }} variants={slideIn}>
        <Grid container item xs={12} direction="column" alignContent="center" alignItems="flex-start">
          <Grid item xs={12}>
            <StyledTitle variant="h3" className={'title'}>
              What do you need to Do
            </StyledTitle>
          </Grid>

          <Grid item xs={8} md={12} className={'bodyWrapper1'}>
            <motion.p
              className={'body1'}
              animate={{
                x: [-50, 0],
                opacity: 1,
              }}
              initial={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
            >
              Organize your life in seconds!
            </motion.p>
          </Grid>
          <StyledTodoPen
            xs={12}
            animate={{
              y: [300, 0],
              opacity: 1,
            }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            item
          >
            <IconButton size="small" onClick={openTodosApp}>
              <CreateIcon viewBox="0 0 25 25" className={'todoPen'} />
            </IconButton>
          </StyledTodoPen>
        </Grid>
      </StyledContainer>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        item
        xs={12}
        sm={5}
        component={motion.div}
        animate={{
          x: [150, 0],
          opacity: 1,
        }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        <StyledSvgGrid container direction="column" item xs={9} sm={12}>
          <TodoIcon className={'todoIcon'} />
        </StyledSvgGrid>
      </Grid>
    </StyledWrapper>
  );
};
export default MainPage;
const StyledWrapper = styled(Grid)`
  height: 87vh;
  padding: 0 1rem;
`;

const StyledTodoPen = styled(({ children, ...rest }) => (
  <Grid component={motion.div} {...rest}>
    {children}
  </Grid>
))`
  align-self: center;
`;
const StyledContainer = styled(({ children, ...rest }) => (
  <Grid component={motion.div} {...rest}>
    {children}
  </Grid>
))`
  align-self: center;

  .title {
    font-size: 3.5rem;
    font-weight: 900;
    color: var(--title-color);
  }
  .todoPen {
    font-size: 6rem;
    color: var(--title-color);
  }

  .body1 {
    font-size: 1.5rem;
    color: var(--text-color);
  }

  //Media Queries

  @media (max-width: 1000px) {
    .title {
      font-size: 2.5rem;
      text-align: center;
    }
    .body1 {
      font-size: 1rem;
      text-align: center;
    }
    .todoPen {
      font-size: 4rem;
    }
    .bodyWrapper1 {
      align-self: center;
    }
  }

  @media (max-width: 700px) {
    .title {
      font-size: 1.75rem;
      text-align: center;
    }

    .todoPen {
      font-size: 4rem;
    }
  }
  @media (max-width: 340px) {
    .title {
      font-size: 2rem;
      text-align: center;
    }
    .body1 {
      font-size: 1.25rem;
      text-align: center;
    }
    .todoPen {
      font-size: 4rem;
    }
  }
`;

const StyledTitle = styled(Typography)``;

const StyledSvgGrid = styled(Grid)`
  .todoIcon {
    height: auto;
    width: 100%;
  }
  @media (min-width: 960px) {
    .todoIcon {
      height: 100%;
    }
  }
`;
