import React, { useEffect } from "react";
import { Grid, Divider } from "@material-ui/core";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import {
  useAnimation,
  motion,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import { ReactComponent as SimpleIcon } from "../../../assets/svgs/Flower.svg";
import { ReactComponent as QuickIcon } from "../../../assets/svgs/rocket.svg";
import { ReactComponent as PriorityIcon } from "../../../assets/svgs/priority.svg";
import { ReactComponent as OrganizeIcon } from "../../../assets/svgs/Calendar.svg";

const Content: React.FC = () => {
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
  const { scrollYProgress } = useViewportScroll();
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [0, -10, -100], {
    clamp: false,
  });
  // const y = useMotionValue(0);

  useEffect(() => {
    icon1.inView
      ? icon1Controls.start("visible")
      : icon1Controls.start("hidden");
  }, [icon1Controls, icon1.inView]);
  useEffect(() => {
    icon2.inView
      ? icon2Controls.start("visible")
      : icon2Controls.start("hidden");
  }, [icon2Controls, icon2.inView]);

  useEffect(() => {
    icon3.inView
      ? icon3Controls.start("visible")
      : icon3Controls.start("hidden");
  }, [icon3Controls, icon3.inView]);
  useEffect(() => {
    icon4.inView
      ? icon4Controls.start("visible")
      : icon4Controls.start("hidden");
  }, [icon4Controls, icon4.inView]);
  const iconVariants = {
    hidden: {
      opacity: 0,
      y: 0,
    },
    visible: {
      opacity: 1,
      scale: [0.5, 1],
    },
    animateRocket: {
      y: y.get(),
      opacity: 1,
    },
  };
  return (
    <StyledContainer container direction="row">
      <Grid
        container
        item
        xs={12}
        spacing={3}
        justify="space-between"
        style={{ paddingBottom: "1rem" }}
      >
        <Grid
          item
          xs={12}
          container
          md={5}
          justify="space-between"
          alignItems="center"
        >
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
            <SimpleIcon className={"svgs"} />
          </Grid>
          <Grid item xs={5}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
            praesentium deserunt quo tenetur aspernatur est suscipit omnis
            cupiditate officiis eaque!
          </Grid>
        </Grid>
        <Divider
          className="dividers"
          orientation="vertical"
          flexItem
          variant="middle"
        />
        <Grid
          item
          xs={12}
          container
          md={5}
          justify="space-between"
          alignItems="center"
          className="reverse"
        >
          <Grid
            item
            xs={5}
            className="svgWrapper"
            ref={icon2.ref}
            initial={"hidden"}
            animate={icon2Controls}
            variants={iconVariants}
            component={motion.div}
          >
            <motion.div
              transition={{ duration: 0.5 }} // variants={iconVariants}
              animate={{ y: y.get() }}
              initial={{ y: 0 }}
            >
              <QuickIcon className={"svgs"} />
            </motion.div>
          </Grid>
          <Grid item xs={5}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
            praesentium deserunt quo tenetur aspernatur est suscipit omnis
            cupiditate officiis eaque!
          </Grid>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={3} justify="space-between">
        <Grid
          item
          xs={12}
          container
          md={5}
          justify="space-between"
          alignItems="center"
        >
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
            <PriorityIcon className={"svgs"} />
          </Grid>
          <Grid item xs={5}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
            praesentium deserunt quo tenetur aspernatur est suscipit omnis
            cupiditate officiis eaque!
          </Grid>
        </Grid>
        <Divider
          className="dividers"
          orientation="vertical"
          flexItem
          variant="middle"
        />
        {/* <Grid container item xs={12} md={undefined}>
          <Divider variant="fullWidth" />
        </Grid> */}
        <Grid
          item
          xs={12}
          container
          md={5}
          justify="space-between"
          alignItems="center"
          className="reverse"
        >
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
            <OrganizeIcon className={"svgs"} />
          </Grid>
          <Grid item xs={5}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
            praesentium deserunt quo tenetur aspernatur est suscipit omnis
            cupiditate officiis eaque!
          </Grid>
          <Divider flexItem variant="fullWidth" orientation="horizontal" />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
export default Content;

const StyledContainer = styled(Grid)`
  padding: 2.5rem;
  // height: 70%;
  background-color: var(--text-color);
  .svgs {
    width: 13rem;
    height: 15rem;
  }
  .svgWrapper {
    text-align: center;
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
      height: 10rem;
    }
  }
`;
