import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import styled from 'styled-components';
// import { device } from "utils/helpers/device";
import { toast, ToastOptions } from 'react-toastify';
import { Categories } from 'stores/appStore';
import WriteTodos from './pages/writeTodos';
import ListTodos from './pages/listTodos';
import CategoriesButtons from './pages/categoriesButtons';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'modules/auth/authContext';
import { RoutesConfig } from 'utils/interfaces/routesConfig';
import useGetTodos from './hooks/useGetTodos';
import useUpdateTodo from './hooks/useUpdateTodo';
import useAddTodo from './hooks/useAddTodo';
import { useQueryClient } from 'react-query';

const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: false,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const TodoListOverview: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { userLoggedIn, userDetails } = useAuthContext();

  const [activeCategory, setActiveCategory] = useState<Categories>(Categories.PERSONAL);
  // const [todos, setTodos] = React.useState<TodosList[]>([]);
  const [toggleCompleted, setToggleCompleted] = React.useState(false);
  const { todosList } = useGetTodos(toggleCompleted, activeCategory);
  const queryClient = useQueryClient();
  const { mutateAsync: updateTodoAsync } = useUpdateTodo();
  const { mutateAsync: addTodoAsync } = useAddTodo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      console.log('Routed from Todos to Login');
      navigate(`/${RoutesConfig.USER}${RoutesConfig.USER_LOGIN}`);
    }
  }, [navigate, userLoggedIn]);

  const addTodo = (todo: string, type: Categories) => {
    addTodoAsync(
      {
        createTodoInput: {
          action: todo,
          category: type,
        },
      },
      {
        onError: (err, vars, context) => {
          queryClient.setQueriesData('fetchTodos', context?.previousTodos);
        },
      }
    );

    if (todosList.length <= 1 && userDetails.todos.length <= 1) toast.info('✅ Swipe a Todo to mark as Complete!', toastOptions);
  };
  const handleRemoveTodo = async (type: Categories, id: string) => {
    await updateTodoAsync(
      {
        updateTodoInput: {
          todoId: id,
          isDone: true,
        },
      },
      {
        onError: (err, vars, context) => {
          queryClient.setQueriesData('fetchTodos', context?.previousTodos);
        },
      }
    );
  };

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
    <StyledContainer container direction="column" wrap={'nowrap'} justifyContent="center" alignContent="center">
      <Grid container item xs={12} style={{ flexBasis: '30%' }} justifyContent="center" alignContent="center">
        <Button color="inherit" onClick={() => setToggleCompleted(!toggleCompleted)}>
          {toggleCompleted ? 'Completed' : 'Todos'}
        </Button>
        <CategoriesButtons handleChangeCategory={setActiveCategory} />
      </Grid>
      <Grid container item direction="column" justifyContent="center" alignContent="center" xs={12}>
        <ListTodos showCompleted={toggleCompleted} handleRemoveTodo={handleRemoveTodo} todosLists={todosList} activeCategory={activeCategory} />
      </Grid>

      <Grid container item justifyContent="center" alignContent="center" xs={12} style={{ flexBasis: '20%' }}>
        <WriteTodos onFormSubmit={(value) => addTodo(value, activeCategory)} open={!toggleCompleted} />
      </Grid>

      {/* <button onClick={clearLocalStorage}> clear</button> */}
    </StyledContainer>
  );
};
export default TodoListOverview;

const StyledContainer = styled(Grid)`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
