import React, { useEffect } from "react";
import styled from "styled-components";

import { Paper } from "@material-ui/core";
import { Categories } from "../../../stores/appStore";
import Todo from "../components/todo";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { TodosListGroups, TodosList } from "../../../stores/appStore";
const height = 55;
const padding = 16;
const ListTodos: React.FC<
  React.PropsWithChildren<{
    activeCategory: Categories;
    todosLists: TodosListGroups;
    handleRemoveTodo: (type: keyof TodosListGroups, id: number) => void;
    showCompleted?: boolean;
  }>
> = ({
  activeCategory,
  todosLists,
  handleRemoveTodo,
  showCompleted = false,
}) => {
  const y = useMotionValue(0);

  const todos = React.useMemo(
    () =>
      todosLists[activeCategory].filter(
        todo => todo.isComplete === showCompleted
      ),
    [todosLists, activeCategory, showCompleted]
  );
  useEffect(() => {
    y.set(0);
  }, [showCompleted, y]);

  const { top, bottom } = useConstraints(todos);
  return (
    <PaperWrapper
      elevation={0}
      style={{ height: "100%", backgroundColor: "#5cdb95", width: "85%" }}
    >
      <motion.div
        drag="y"
        dragDirectionLock
        dragConstraints={{ top: top, bottom: bottom }}
        style={{
          y: y,
        }}
      >
        <AnimatePresence>
          {todos.length > 0
            ? todos.map(task => {
                return (
                  <Todo
                    markAsComplete={handleRemoveTodo}
                    todo={task}
                    activeCategory={activeCategory}
                    key={task.id}
                  />
                );
              })
            : []}
        </AnimatePresence>
      </motion.div>
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
function getHeight(items: TodosList[]) {
  const totalHeight = items.length * height;
  const totalPadding = (items.length - 1) * padding;
  const totalScroll = totalHeight + totalPadding;
  return totalScroll;
}

function useConstraints(items: TodosList[]) {
  const [constraints, setConstraints] = React.useState({ top: 0, bottom: 0 });
  React.useEffect(() => {
    setConstraints({ top: 150 - getHeight(items), bottom: 0 });
  }, [items]);

  return constraints;
}
