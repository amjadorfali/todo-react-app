import React, { useEffect } from 'react';
import styled from '@mui/styled-engine';

import { Paper } from '@mui/material';
import Todo from 'modules/todoList/components/todo';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { Categories, TodosList } from 'stores/appStore';
const height = 55;
const padding = 16;
const ListTodos: React.FC<
  React.PropsWithChildren<{
    activeCategory: Categories;
    todosLists: TodosList[];
    handleRemoveTodo: (type: Categories, id: string) => void;
    showCompleted?: boolean;
  }>
> = ({ activeCategory, todosLists, handleRemoveTodo, showCompleted = false }) => {
  const y = useMotionValue(0);

  const todos = React.useMemo(() => todosLists.filter((todo) => todo.isDone === showCompleted), [todosLists, showCompleted]);
  useEffect(() => {
    y.set(0);
  }, [showCompleted, y]);

  const { top, bottom } = useConstraints(todos);
  return (
    <PaperWrapper
      elevation={0}
      style={{ height: '100%', backgroundColor: '#5cdb95', width: '85%', minHeight: '56vh', maxHeight: '56vh', overflowY: 'auto' }}
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
            ? todos.map((task) => {
                return <Todo markAsComplete={handleRemoveTodo} todo={task} activeCategory={activeCategory} key={task.id} />;
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
