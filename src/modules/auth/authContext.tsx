import React, { useState, useContext, useMemo, useEffect } from 'react';
import useGetCurrUser from './hooks/useGetCurrUser';

// import { RequestInit } from 'graphql-request/dist/types.dom';
import { GraphQLClient } from 'graphql-request';
import { TodosList } from 'stores/appStore';

export interface User {
  email: string;
  firstName: string;
  id: string;
  lastName?: string | null;
  registrationDate: Date;
  registrationNumber: number;
  userName: string;
  todos: TodosList[];
}

export type AuthContextType = {
  userDetails: User;
  userFetchedSuccessfully: boolean;
  changeToken: (token: string) => void;
  refetchUserData: () => void;
  gqlClient: GraphQLClient;
  userLoggedIn: boolean;
};

const localKey = 'access-token';
const GQLClient = new GraphQLClient(process.env.REACT_APP_INTERNAL_API || '');

const getDataSource = (authToken: string): GraphQLClient => {
  if (authToken) GQLClient.setHeader('authorization', `Bearer ${authToken}`);
  else GQLClient.setHeader('authorization', '');

  return GQLClient;
};

export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem(localKey) || '');
  const gqlClient = useMemo(() => getDataSource(accessToken), [accessToken]);
  const { data: userDetails, isSuccess: userFetchedSuccessfully, refetch, isError: failedToGetUser } = useGetCurrUser(gqlClient, !!accessToken);
  const userLoggedIn = useMemo(() => !!accessToken && !!userDetails.userName, [accessToken, userDetails.userName]);
  const changeToken = (token: string) => {
    localStorage.setItem(localKey, token);
    setAccessToken(token);
  };

  useEffect(() => {
    if (failedToGetUser && !userLoggedIn) {
      changeToken('');
    }
  }, [failedToGetUser, userLoggedIn]);

  const refetchUserData = () => refetch();

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        gqlClient,
        userFetchedSuccessfully,
        userLoggedIn,
        refetchUserData,
        changeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
