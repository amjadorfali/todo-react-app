import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
// import { device } from "../../utils/helpers/device";

import { useAppStore } from "../../stores";
import { Categories, TodosListGroups } from "../../stores/appStore";
import WriteTodos from "./pages/writeTodos";
import ListTodos from "./pages/listTodos";
import CategoriesButtons from "./pages/categoriesButtons";
import { observer } from "mobx-react-lite";
import "./styles.scss";
const TodoListOverview: React.FC = observer(() => {
  const { addTodo, todosLists } = useAppStore();
  const [todos, setTodos] = useState<TodosListGroups>({ ...todosLists });
  const [activeCategory, setActiveCategory] =
    useState<Categories>("personalTodos");
  // const [writeTodoOpen, setWriteTodoOpen] = useState(false);
  // const [divVariant, setDivVariant] =
  //   useState<"active" | "inactive" | "">("active");
  // const [doneAnimate, setDoneAnimate] = useState(true);
  // const [baseElementHeight, setBaseHeight] = useState<number>(0);
  // const controls = useAnimation();
  // const y = useMotionValue(0);
  // useEffect(() => {
  //   controls.start("active");
  // });
  // const variants = {
  //   active: {
  //     y: [y.get()],
  //   },
  //   inactive: {
  //     y: [y.get(), y.get() - 90, y.get(), y.get() - 50, y.get()],
  //     transition: { duration: 2.5 },
  //   },
  //   back: {
  //     transition: { duration: 2.5 },
  //   },
  // };

  // useEffect(() => {
  //   y.onChange(latest => {
  //     y.set(latest);
  //   });
  // });

  return (
    <StyledContainer
      container
      direction="column"
      wrap={"nowrap"}
      justify="center"
      alignContent="center"
    >
      <Grid
        container
        item
        xs={12}
        style={{ flexBasis: "30%" }}
        justify="center"
        alignContent="center"
      >
        <CategoriesButtons handleChangeCategory={setActiveCategory} />
      </Grid>
      <Grid
        container
        item
        direction="column"
        justify="center"
        alignContent="center"
        xs={12}
        style={{ overflow: "scroll" }}
      >
        <ListTodos todosLists={todos} activeCategory={activeCategory} />
      </Grid>
      <Grid
        container
        item
        justify="center"
        alignContent="center"
        xs={12}
        style={{ flexBasis: "20%" }}
      >
        <WriteTodos
          onFormSubmit={value => {
            setTodos({ ...addTodo(value, activeCategory) });
          }}
          open={true}
        ></WriteTodos>
      </Grid>

      {/* <button onClick={clearLocalStorage}> clear</button> */}
    </StyledContainer>
  );
});
export default TodoListOverview;

const StyledContainer = styled(Grid)`
  height: 81vh;
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
