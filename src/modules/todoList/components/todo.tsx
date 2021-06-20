import React, { useEffect } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";
import styled from "styled-components";
import { Categories, TodosList } from "../../../stores/appStore";
import { TodosListGroups } from "../../../stores/appStore";
import { observer } from "mobx-react-lite";
const Todo: React.FC<{
  activeCategory: Categories;
  todo: TodosList;
  markAsComplete: (type: keyof TodosListGroups, id: number) => void;
}> = observer(({ activeCategory, todo, markAsComplete }) => {
  const [dragConstraints, setConstraints] = React.useState(0);

  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#05386b", "#ffffff", "#05386b"]
  );
  useEffect(
    () =>
      x.onChange(latest => {
        if ((latest >= 150 || latest <= -150) && !todo.isComplete) {
          markAsComplete(activeCategory, todo.id);
          setConstraints(latest * 5);
        }
      }),
    [x, markAsComplete, todo, activeCategory]
  );

  return (
    <PaperMotion
      key={todo.id}
      style={{ background, x }}
      drag="x"
      dragConstraints={{
        left: dragConstraints,
        right: dragConstraints,
      }}
      exit={{
        opacity: 0,
        transition: { duration: 1, x: [x.get(), x.get() * 3, x.get() * 5] },
      }}
      animate={{ opacity: [0, 1] }}
    >
      <p key={todo.id} style={{ padding: "1rem", textAlign: "justify" }}>
        {todo.todo}
      </p>
    </PaperMotion>
  );
});
export default Todo;

const PaperMotion = styled(motion.div)`
  box-shadow: 0px 6px 6px -3px rgb(0 0 0 / 20%),
    0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%);
  background: white;
  border-radius: 10px;
  width: 100%;
  margin: 1rem 0;
`;
