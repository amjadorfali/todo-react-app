import React from "react";
import styled from "styled-components";

import { Paper } from "@material-ui/core";
import { Categories } from "../../../stores/appStore";
import Todo from "../components/todo";
import { AnimatePresence } from "framer-motion";
import { TodosListGroups } from "../../../stores/appStore";

const ListTodos: React.FC<{
  activeCategory: Categories;
  todosLists: TodosListGroups;
  handleRemoveTodo: (type: keyof TodosListGroups, id: number) => void;
}> = ({ activeCategory, todosLists, handleRemoveTodo }) => {
  return (
    <PaperWrapper
      elevation={0}
      style={{ height: "100%", backgroundColor: "#5cdb95", width: "85%" }}
    >
      <AnimatePresence>
        {todosLists[activeCategory].length > 0 &&
          todosLists[activeCategory].map(task => {
            if (!task.isComplete) {
              return (
                <Todo
                  markAsComplete={handleRemoveTodo}
                  todo={task}
                  activeCategory={activeCategory}
                  key={task.id}
                />
              );
            }
            return null;
          })}
      </AnimatePresence>
    </PaperWrapper>
  );
};
export default ListTodos;

const PaperWrapper = styled(Paper)`
  .todo {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;
