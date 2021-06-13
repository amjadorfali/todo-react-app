import React, { useState } from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { TodosListGroups } from "../../../stores/appStore";
import { Categories } from "../../../stores/appStore";
import useDebounce from "../../../hooks/useDebounce";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "../../../stores";

const ListTodos: React.FC<{
  activeCategory: Categories;
  todosLists: TodosListGroups;
}> = ({ activeCategory, todosLists }) => {
  const { markAsComplete } = useAppStore();
  const [startTimer, setStartTimer] = useState(false);
  const removeTodoFinished = useDebounce(startTimer, 1300);

  return (
    <Paper
      elevation={0}
      style={{ height: "100%", backgroundColor: "#5cdb95", width: "85%" }}
    >
      <AnimatePresence>
        {" "}
        {/* <StyledContainer> */}
        {todosLists[activeCategory].length > 0 &&
          todosLists[activeCategory].map(task => {
            if (!task.isComplete) {
              return (
                <motion.div
                  key={task.id}
                  whileTap={{ scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  // animate visibile / removed
                  onTapCancel={() => {
                    if (removeTodoFinished) {
                      markAsComplete(activeCategory, task.id);
                      setStartTimer(false);
                    }
                  }}
                  //On start i want to start a counter to 2 seconds
                  //If the user stops tap before 2seconds, we cancel everything
                  //else on transition end, we unmount this component

                  onTapStart={(event, info) => {
                    setStartTimer(true);
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  animate={{ opacity: [0, 1] }}
                >
                  <TodoPaper key={task.id}>{task.todo}</TodoPaper>
                </motion.div>
              );
            }
            return null;
          })}
      </AnimatePresence>
      {/* </StyledContainer> */}
    </Paper>
  );
};
export default ListTodos;
const TodoPaper = styled(Paper)`
  padding: 1rem;
  margin: 0.5rem 0;
`;
// const StyledContainer = styled.div`
//   display: flex;
//   align-content: stretch;
//   justify-content: space-evenly;
//   height: 100%;
//   align-items: stretch;
//   flex-direction: column;
//   overflow: scroll;
// `;
