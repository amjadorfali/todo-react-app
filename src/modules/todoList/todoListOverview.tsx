import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import styled from "styled-components";
// import { device } from "../../utils/helpers/device";
import { toast } from "react-toastify";
import { Categories, TodosListGroups } from "../../stores/appStore";
import WriteTodos from "./pages/writeTodos";
import ListTodos from "./pages/listTodos";
import CategoriesButtons from "./pages/categoriesButtons";
import { observer } from "mobx-react-lite";
import "./styles.scss";
const TodoListOverview: React.FC<React.PropsWithChildren<unknown>> = observer(
  () => {
    const [activeCategory, setActiveCategory] =
      useState<Categories>("personalTodos");
    const [todos, setTodos] = React.useState<TodosListGroups>({
      personalTodos: [],
      workTodos: [],
      generalTodos: [],
      homeTodos: [],
      schoolTodos: [],
    });

    const [toggleCompleted, setToggleCompleted] = React.useState(false);
    const addTodo = (todo: string, type: Categories) => {
      setTodos(prev => {
        const newItem = prev[type];
        newItem.push({
          isComplete: false,
          todo,
          id: prev[type].length,
        });
        localStorage.setItem(
          "todosLists",
          JSON.stringify({ ...prev, [type]: newItem })
        );

        return { ...prev, [type]: newItem };
      });
      if (todos[type].length === 1)
        toast.info("✅ Swipe a Todo to mark as Complete!", {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
    };
    const handleRemoveTodo = (type: keyof TodosListGroups, id: number) => {
      todos[type].some(todo => {
        if (todo.id === id) {
          todo.isComplete = true;
          return true;
        }
        return false;
      });
      setTodos(prev => {
        localStorage.setItem(
          "todosLists",
          JSON.stringify({
            ...prev,
            [type]: todos[type],
          })
        );

        return {
          ...prev,
          [type]: todos[type],
        };
      });
    };

    // React.useEffect(() => {
    //   localStorage.setItem("todosLists", JSON.stringify(todos));
    // }, [todos]);
    React.useEffect(() => {
      const localData = localStorage.getItem("todosLists");
      if (localData !== null) {
        setTodos(JSON.parse(localData));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
        justifyContent="center"
        alignContent="center"
      >
        <Grid
          container
          item
          xs={12}
          style={{ flexBasis: "30%" }}
          justifyContent="center"
          alignContent="center"
        >
          <Button onClick={() => setToggleCompleted(!toggleCompleted)}>
            {toggleCompleted ? "Show Pending" : "Show Completed"}
          </Button>
          <CategoriesButtons handleChangeCategory={setActiveCategory} />
        </Grid>
        <Grid
          container
          item
          direction="column"
          justifyContent="center"
          alignContent="center"
          xs={12}
          style={{ overflow: "scroll" }}
        >
          <ListTodos
            showCompleted={toggleCompleted}
            handleRemoveTodo={handleRemoveTodo}
            todosLists={todos}
            activeCategory={activeCategory}
          />
        </Grid>

        <Grid
          container
          item
          justifyContent="center"
          alignContent="center"
          xs={12}
          style={{ flexBasis: "20%" }}
        >
          <WriteTodos
            onFormSubmit={value => addTodo(value, activeCategory)}
            open={!toggleCompleted}
          />
        </Grid>

        {/* <button onClick={clearLocalStorage}> clear</button> */}
      </StyledContainer>
    );
  }
);
export default TodoListOverview;

const StyledContainer = styled(Grid)`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
