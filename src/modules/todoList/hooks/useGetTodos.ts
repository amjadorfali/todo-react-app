import { useFetchTodosQuery } from 'generated/react-query-types';
import { useAuthContext } from 'modules/auth/authContext';
import { Categories, TodosList } from 'stores/appStore';

const useGetTodos = (isDone: boolean, category: Categories) => {
  const { gqlClient, userLoggedIn } = useAuthContext();
  const { data } = useFetchTodosQuery<TodosList[]>(
    gqlClient,
    { paginationInput: {} },

    {
      enabled: userLoggedIn,
      initialData: () => {
        const localData = localStorage.getItem('todosList');
        if (localData !== null) return { fetchTodos: JSON.parse(localData) };
        return { fetchTodos: [] };
      },
      select: ({ fetchTodos }) => fetchTodos.filter((todo) => todo.isDone === isDone && todo.category === category) as TodosList[],
      onSuccess: (data) => localStorage.setItem('todosList', JSON.stringify(data)),
    }
  );

  return { todosList: data || [] };
};

export default useGetTodos;
