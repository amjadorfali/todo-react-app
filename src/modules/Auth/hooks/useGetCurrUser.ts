import { GetCurrentAuthenticatedUserQuery, useGetCurrentAuthenticatedUserQuery } from 'generated/react-query-types';
import { User } from 'modules/auth/authContext';
import { GraphQLClient } from 'graphql-request';

const useGetCurrUser = (gqlClient: GraphQLClient, enabled: boolean) => {
  const { data, isError, isLoading, isSuccess, error, refetch } = useGetCurrentAuthenticatedUserQuery(
    gqlClient,
    { paginationInput: {} },
    {
      enabled: enabled,
      initialData: {
        getCurrentAuthenticatedUser: {
          userName: '',
          id: '',
          registrationNumber: 0,
          lastName: '',
          email: '',
          firstName: '',
          registrationDate: new Date(),
          todos: [],
        },
      },
      refetchOnWindowFocus: false,
    }
  );
  return {
    refetch,
    error,
    data: (data || ({} as GetCurrentAuthenticatedUserQuery)).getCurrentAuthenticatedUser as User,
    isError,
    isLoading,
    isSuccess,
  };
};
export default useGetCurrUser;
