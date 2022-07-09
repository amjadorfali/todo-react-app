import { FetchTodosQuery, useAddTodoMutation } from 'generated/react-query-types';
import { useAuthContext } from 'modules/auth/authContext';
import { useQueryClient } from 'react-query';
import { Categories, TodosList } from 'stores/appStore';

const FETCH_TODOS_QUERY_KEY = 'fetchTodos';

const useAddTodo = () => {
  const { gqlClient } = useAuthContext();
  const queryClient = useQueryClient();

  return useAddTodoMutation(gqlClient, {
    // When mutate is called:
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(FETCH_TODOS_QUERY_KEY);

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<TodosList[]>(FETCH_TODOS_QUERY_KEY) || [];

      const { createTodoInput: createdTodo } = newTodo;

      // Optimistically update to the new value
      queryClient.setQueriesData<FetchTodosQuery>(FETCH_TODOS_QUERY_KEY, (old) => ({
        fetchTodos: [
          { action: createdTodo.action, category: (createdTodo.category || Categories.PERSONAL) as Categories, isDone: false, id: '' },
          ...(old?.fetchTodos || []),
        ],
      }));

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails, use the context returned from onMutate to roll back

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(FETCH_TODOS_QUERY_KEY);
    },
  });
};
export default useAddTodo;
