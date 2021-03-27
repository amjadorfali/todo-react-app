import React, { useEffect, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import { Grid, ButtonBase, Typography, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { device } from "../../utils/helpers/device";
import { useAppStore } from "../../stores";
import WriteTodos from "./pages/writeTodos";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import "./styles.scss";
const TodoListOverview: React.FC = () => {
  const [writeTodoOpen, setWriteTodoOpen] = useState(false);
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
    active: {
      y: [y.get()],
    },
    inactive: {
      y: [y.get(), y.get() - 90, y.get(), y.get() - 50, y.get()],
      transition: { duration: 2.5 },
    },
    back: {
      transition: { duration: 2.5 },
    },
  };

  // useEffect(() => {
  //   y.onChange(latest => {
  //     y.set(latest);
  //   });
  // });
  const { todosList, addTodo } = useAppStore();
  return (
    <StyledContainer
      container
      direction="column"
      justify="center"
      alignContent="center"
    >
      {/* <ButtonBase focusRipple> */}
      <Grid
        container
        item
        direction="row"
        justify="center"
        alignContent="center"
      >
        <StyledTitle variant="h3" className={"title"} align="center">
          What do you need to
          <motion.span
            whileTap={{
              scale: 1.5,
              color: "white",
              rotateX: 360,
              transition: {
                duration: 0.5,
                bounceDamping: 10,
                timeConstant: 1000,
              },
            }}
            // onTapCancel={{ scale: 1 }}
            variants={variants}
            style={{ y }}
            animate={controls}
            onHoverStart={async (event, info) => {
              if (doneAnimate) {
                setDoneAnimate(false);
                await controls.start("inactive");
              } else {
                const stringToUse = y.get();
                const stringToUp = stringToUse * 1.75;
                controls.start({
                  y: [stringToUse, stringToUp, 0],
                  transition: { delay: 0.1, duration: 1 },
                });
              }
            }}
            transition={{ duration: 2.5 }}
            onAnimationComplete={definition => {
              setDoneAnimate(true);
            }}
          >
            Do ?
          </motion.span>
        </StyledTitle>

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
      <Grid
        component={motion.div}
        animate={{
          y: ["100rem", "0rem"],
        }}
        transition={{ duration: 2.5 }}
        item
        style={{ alignSelf: "center" }}
      >
        <IconButton
          size="small"
          onClick={() => setWriteTodoOpen(!writeTodoOpen)}
        >
          <CreateIcon
            // color="inherit"
            viewBox="0 0 25 25"
            style={{}}
            className={"icon"}
          />
        </IconButton>
      </Grid>
      <WriteTodos
        onFormSubmit={value => addTodo(value)}
        open={writeTodoOpen}
      ></WriteTodos>
      {/* <div
        style={{ backgroundColor: "white", width: "10rem", height: "10rem" }}
      >
        {todosList.length > 0 && todosList.map(todo => <p>{todo}</p>)}
      </div> */}
    </StyledContainer>
  );
};
export default TodoListOverview;

const StyledContainer = styled(Grid)`
  .title {
    font-size: 3.5rem;
    font-weight: 600;
    color: var(--title-color);
    display: flex;
  }
  .icon {
    font-size: 8rem;
    color: var(--title-color);
  }
  @media (max-width: 480px) {
    .title {
      font-size: 2.5rem;
      flex-flow: column;
    }
    .icon {
      font-size: 4rem;
    }
  }
`;

const StyledTitle = styled(Typography)``;
