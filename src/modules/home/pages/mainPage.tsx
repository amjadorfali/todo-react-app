import React, { FormEvent, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import {
  Grid,
  ButtonBase,
  Typography,
  IconButton,
  Box,
  SvgIcon,
} from "@material-ui/core";
import styled from "styled-components";
import { TextField, Grow } from "@material-ui/core";
import RightImage from "../../../assets/images/pluto-page-under-construction.png";
import LeftImage from "../../../assets/images/polar-15.png";
import { ReactComponent as TodoIcon } from "../../../assets/svgs/todo.svg";
import CreateIcon from "@material-ui/icons/Create";
import { device } from "../../../utils/helpers/device";

interface IProps {
  open: boolean;
  onFormSubmit: (value: string) => void;
}
const MainPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [divVariant, setDivVariant] = useState<"active" | "inactive" | "">(
    "active"
  );
  const [doneAnimate, setDoneAnimate] = useState(true);
  const [baseElementHeight, setBaseHeight] = useState<number>(0);
  const controls = useAnimation();
  const y = useMotionValue(0);
  // useEffect(() => {
  //   controls.start("active");
  // });

  const variants = {
    initial: {
      color: "#379683",
      transition: { duration: 0.5 },
    },
    active: {
      color: "#edf5e1",
      scale: [1, 2, 2, 1, 1],
      rotate: [0, -45, 45, -20, 0],
    },
    tap: {
      color: "#edf5e1",
      scale: [1, 2],
      rotate: [0, -45, 45, -20],
      transition: { duration: 1 },
    },
  };

  const slideIn = {
    visible: { opacity: 1, scale: [0.5, 1] },
    hidden: { opacity: 0 },
    //TODO :
  };
  return (
    //TODO:
    <StyledWrapper container justify="center">
      <StyledContainer
        item
        xs={12}
        sm={7}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={slideIn}
      >
        <Grid
          container
          item
          xs={12}
          direction="column"
          alignContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <StyledTitle variant="h3" className={"title"}>
              What do you need to
            </StyledTitle>
          </Grid>

          <StyledDoGrid item xs={12}>
            <motion.div
              variants={variants}
              whileTap={"tap"}
              initial={false}
              style={{ y }}
              animate={controls}
              onHoverStart={(event, info) => {
                if (doneAnimate) {
                  setDoneAnimate(false);
                  controls.start("active");
                }
              }}
              transition={{ duration: 2.5 }}
              onAnimationComplete={definition => {
                setDoneAnimate(true);
                if (definition === "active") {
                  controls.start("initial");
                }
              }}
              className={"do"}
            >
              Do
            </motion.div>
          </StyledDoGrid>
          <Grid item xs={8} md={12} className={"bodyWrapper1"}>
            <p className={"body1"}>Organize your life in seconds!</p>
          </Grid>
          <Grid
            xs={12}
            component={motion.div}
            animate={{
              y: ["30rem", "0rem"],
              opacity: 1,
            }}
            transition={{ duration: 1.2, delay: 1 }}
            item
            style={{ alignSelf: "center", opacity: 0.1 }}
          >
            <IconButton
              size="small"
              // onClick={() => setWriteTodoOpen(!writeTodoOpen)}
            >
              <CreateIcon
                // color="inherit"
                viewBox="0 0 25 25"
                style={{}}
                className={"todoPen"}
              />
            </IconButton>
          </Grid>
          {/* <motion.div
          variants={variants}
          animate={divVariant}
          onHoverStart={() => {
            setDivVariant("inactive");
          }}
          onHoverEnd={() => {
            setDivVariant("active");
          }}
          transition={{ duration: 2.5 }}
        >
          Yolo
        </motion.div> */}
        </Grid>
      </StyledContainer>
      <Grid
        container
        justify="center"
        alignContent="center"
        item
        xs={12}
        sm={5}
      >
        <StyledSvgGrid item xs={9} sm={12}>
          <TodoIcon className={"todoIcon"} />
        </StyledSvgGrid>
      </Grid>
    </StyledWrapper>
  );
};
export default MainPage;
const StyledWrapper = styled(Grid)`
  height: 90%;
  padding: 0 1rem;
`;
const StyledDoGrid = styled(Grid)`
  align-self: center;
`;
const StyledContainer = styled(({ children, ...rest }) => (
  <Grid component={motion.div} {...rest}>
    {children}
  </Grid>
))`
  align-self: center;

  .title,
  .do {
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
    .title,
    .do {
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
    .title,
    .do {
      font-size: 1.75rem;
      text-align: center;
    }

    .todoPen {
      font-size: 4rem;
    }
  }
  @media (max-width: 340px) {
    .title,
    .do {
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
