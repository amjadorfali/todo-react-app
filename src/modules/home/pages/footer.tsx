import React from "react";
// import { useMotionValue } from "framer-motion";
import { Grid } from "@material-ui/core";
// import styled from "styled-components";
import { useInView } from "react-intersection-observer";

import { ReactComponent as PendingIcon } from "../../../assets/svgs/under-construction.svg";
import { useAnimation, motion } from "framer-motion";

const Header: React.FC<React.PropsWithChildren<unknown>> = () => {
  const iconControls = useAnimation();
  const underConstructionIcon = useInView();
  React.useEffect(() => {
    underConstructionIcon.inView
      ? iconControls.start("visible")
      : iconControls.start("hidden");
  }, [iconControls, underConstructionIcon.inView]);
  const SvgIcon = motion(PendingIcon);
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
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignContent="center"
      ref={underConstructionIcon.ref}
      style={{ padding: "5rem 0", height: "80vh" }}
    >
      <SvgIcon
        initial={"hidden"}
        animate={iconControls}
        variants={iconVariants}
        width="100%"
        height="100%"
      />
      {/* <SvgIcon width="100%" height="100%" /> */}
    </Grid>
  );
};
export default Header;

// const StyledContainer = styled(Grid)`
//   height: 90%;
//   .title {
//     font-size: 4.5rem;
//     font-weight: 900;
//     color: var(--title-color);
//   }
//   .icon {
//     font-size: 8rem;
//     color: var(--title-color);
//   }
//   .body1 {
//     font-size: 1.5rem;
//   }
//   @media (max-width: 1000px) {
//     .title {
//       font-size: 3rem;
//     }
//     .body1 {
//       font-size: 1rem;
//     }
//     .icon {
//       font-size: 4rem;
//     }
//   }

//   @media (max-width: 700px) {
//     .title {
//       font-size: 2rem;
//     }

//     .icon {
//       font-size: 4rem;
//     }
//   }
//   @media (max-width: 340px) {
//     .title {
//       font-size: 2.5rem;
//     }
//     .body1 {
//       font-size: 1.75rem;
//     }
//     .icon {
//       font-size: 4rem;
//     }

//     .icon {
//       font-size: 4rem;
//     }
//   }
// `;

// const StyledTitle = styled(Typography)``;
// const StyledImage = styled(motion.img)`
//   width: 50%;
//   height: 50%;
// `;
