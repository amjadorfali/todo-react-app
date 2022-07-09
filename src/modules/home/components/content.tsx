import React, { useEffect } from 'react';
import { Grid, Divider } from '@mui/material';
import styled from '@mui/styled-engine';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';
import { ReactComponent as SimpleIcon } from 'assets/svgs/Flower.svg';
import QuickIcon from 'assets/svgs/rocket.svg';
import PriorityIcon from 'assets/svgs/priority.svg';
import OrganizeIcon from 'assets/svgs/Calendar.svg';

const Content: React.FC<React.PropsWithChildren<unknown>> = () => {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  const icon1Controls = useAnimation();
  const icon1 = useInView();
  const icon2Controls = useAnimation();
  const icon2 = useInView();
  const icon3Controls = useAnimation();
  const icon3 = useInView();
  const icon4Controls = useAnimation();
  const icon4 = useInView();

  useEffect(() => {
    if (icon1.inView) {
      icon1Controls.start('visible');
    } else {
      icon1Controls.start('hidden');
    }
  }, [icon1Controls, icon1.inView]);
  useEffect(() => {
    icon2.inView ? icon2Controls.start('visible') : icon2Controls.start('hidden');
  }, [icon2Controls, icon2.inView]);

  useEffect(() => {
    icon3.inView ? icon3Controls.start('visible') : icon3Controls.start('hidden');
  }, [icon3Controls, icon3.inView]);
  useEffect(() => {
    icon4.inView ? icon4Controls.start('visible') : icon4Controls.start('hidden');
  }, [icon4Controls, icon4.inView]);
  const iconVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      scale: [0.5, 1],
    },
  };
  return (
    <StyledContainer container direction="row">
      <Grid container item xs={12} spacing={3} justifyContent="space-between" style={{ paddingBottom: '1rem' }}>
        <Grid item xs={12} container md={5} justifyContent="space-between" alignItems="center" className="suggestionBox">
          <Grid
            item
            xs={5}
            className="svgWrapper"
            ref={icon1.ref}
            initial="hidden"
            animate={icon1Controls}
            variants={iconVariants}
            component={motion.div}
          >
            <SimpleIcon className={'svgs'} />
          </Grid>
          <Grid item xs={5}>
            <StyledText>
              Simplicity is the key feature of this app.
              <br />
              <strong>Just keep it simple bro</strong>
            </StyledText>
          </Grid>
        </Grid>
        <Divider className="dividers" orientation="vertical" flexItem variant="middle" />

        <Grid item xs={12} container md={5} justifyContent="space-between" alignItems="center" className="reverse suggestionBox">
          <Grid
            item
            xs={5}
            className="svgWrapper"
            ref={icon2.ref}
            initial={'hidden'}
            animate={icon2Controls}
            variants={iconVariants}
            component={motion.div}
          >
            <img src={QuickIcon} alt="Quickly" className="svgs" />
          </Grid>
          <Grid item xs={5}>
            <StyledText>
              Experience fast interactions, and never miss a single thing todo.
              <br /> <strong>Fast, efficient, reliable.</strong>
            </StyledText>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} style={{ margin: '4rem' }}></Grid>
      <Grid container item xs={12} spacing={3} justifyContent="space-between">
        <Grid item xs={12} container md={5} justifyContent="space-between" alignItems="center" className="suggestionBox">
          <Grid
            item
            xs={5}
            className="svgWrapper"
            ref={icon3.ref}
            initial="hidden"
            animate={icon3Controls}
            variants={iconVariants}
            component={motion.div}
          >
            <img src={PriorityIcon} alt="Prioritize" className="svgs" />
          </Grid>
          <Grid item xs={5}>
            <StyledText>
              Have control over your life! Sometimes <strong>~ </strong>The only impossible journey is the one you <strong>never begin .</strong>
            </StyledText>
          </Grid>
        </Grid>
        <Divider className="dividers" orientation="vertical" flexItem variant="middle" />

        <Grid item xs={12} container md={5} justifyContent="space-between" alignItems="center" className="reverse suggestionBox">
          <Grid
            item
            xs={5}
            className="svgWrapper"
            ref={icon4.ref}
            initial="hidden"
            animate={icon4Controls}
            variants={iconVariants}
            component={motion.div}
          >
            <img src={OrganizeIcon} alt="Organize" className="svgs" />
          </Grid>
          <Grid item xs={5}>
            <StyledText>
              Keeping track of all the things you have to do can sometimes be a hassle, so don't. Write them down and leave the rest to this
              <strong> awesome app!</strong>
            </StyledText>
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
export default Content;
const StyledText = styled('p')`
  font-weight: 200;
  font-size: large;
`;
const StyledContainer = styled(Grid)`
  padding: 1.5rem;
  background-color: var(--text-color);
  .svgs {
    width: 15rem;
    height: 13rem;
  }
  .svgWrapper {
    text-align: center;
  }
  .suggestionBox {
    padding: 5rem 0;
  }
  @media (max-width: 959px) {
    .reverse {
      flex-direction: row-reverse;
    }

    .dividers {
      width: 90%;
      height: 1rem;
    }
  }
  @media (max-width: 540px) {
    .svgs {
      width: 8rem;
      height: 7rem;
    }
  }
  @media (max-width: 320px) {
    .svgs {
      width: 6.5rem;
      height: 5.5rem;
    }
  }
  @media (max-width: 260px) {
    .suggestionBox {
      flex-direction: column;
    }
  }
`;
