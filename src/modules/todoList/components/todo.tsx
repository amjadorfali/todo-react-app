import React, { useEffect } from 'react';
import { useMotionValue, useTransform, motion, useAnimation, PanInfo } from 'framer-motion';
import styled from 'styled-components';
import { Categories, TodosList } from 'stores/appStore';
const Todo: React.FC<
  React.PropsWithChildren<{
    activeCategory: Categories;
    todo: TodosList;
    markAsComplete: (type: Categories, id: string) => void;
  }>
> = ({ activeCategory, todo, markAsComplete }) => {
  const x = useMotionValue(0);
  const background = useTransform(x, [-150, 0, 150], ['#00C500', '#ffffff', '#00C500']);
  const controls = useAnimation();

  async function handleDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (!todo.isDone && (offset < -300 || offset > 300 || velocity < -500)) {
      await controls.start({
        x: [x.get(), x.get() * 1.5, x.get() * 2, x.get() * 2.5, x.get() * 3],
        transition: { duration: 0.75 },
      });
      markAsComplete(activeCategory, todo.id);
    } else {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
    }
  }
  useEffect(() => {
    controls.start({ opacity: [0, 1], transition: { duration: 0.5 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      layout
      transition={{
        type: 'spring',
        stiffness: 600,
        damping: 30,
      }}
    >
      <PaperMotion key={todo.id} style={{ background, x }} drag="x" dragDirectionLock onDragEnd={handleDragEnd} animate={controls}>
        <p key={todo.id} style={{ padding: '1rem', textAlign: 'justify' }}>
          {todo.action}
        </p>
      </PaperMotion>
    </motion.div>
  );
};
export default Todo;

const PaperMotion = styled(motion.div)`
  box-shadow: 0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%);
  background: white;
  border-radius: 10px;
  width: 100%;
  margin: 1rem 0;
`;
