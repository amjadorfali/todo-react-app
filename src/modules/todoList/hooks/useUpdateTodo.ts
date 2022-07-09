import { FetchTodosQuery, useUpdateTodoMutation } from 'generated/react-query-types';
import { useAuthContext } from 'modules/auth/authContext';
import { useQueryClient } from 'react-query';
import { TodosList } from 'stores/appStore';

const FETCH_TODOS_QUERY_KEY = 'fetchTodos';

const useUpdateTodo = () => {
  const { gqlClient } = useAuthContext();
  const queryClient = useQueryClient();

  return useUpdateTodoMutation(gqlClient, {
    // When mutate is called:
    onMutate: async (newTodo) => {
      //FIXME : Only supports updating isDone
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(FETCH_TODOS_QUERY_KEY);

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<TodosList[]>(FETCH_TODOS_QUERY_KEY) || [];

      const { updateTodoInput: updatedTodo } = newTodo;

      // Optimistically update to the new value
      queryClient.setQueriesData<FetchTodosQuery>(FETCH_TODOS_QUERY_KEY, (old) => ({
        fetchTodos: old?.fetchTodos?.map((val) => (val.id === updatedTodo.todoId ? { ...val, isDone: updatedTodo.isDone || true } : val)) || [],
      }));

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails, use the context returned from onMutate to roll back

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(FETCH_TODOS_QUERY_KEY, { active: true, exact: false });
    },
  });
};
export default useUpdateTodo;
