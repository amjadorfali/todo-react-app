import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}

export const AddTodoDocument = `
    mutation addTodo($createTodoInput: CreateTodoInput!) {
  addTodo(createTodoInput: $createTodoInput) {
    action
    category
    id
    isDone
  }
}
    `;
export const useAddTodoMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddTodoMutation, TError, AddTodoMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddTodoMutation, TError, AddTodoMutationVariables, TContext>(
      ['addTodo'],
      (variables?: AddTodoMutationVariables) => fetcher<AddTodoMutation, AddTodoMutationVariables>(client, AddTodoDocument, variables, headers)(),
      options
    );
export const RemoveTodoDocument = `
    mutation removeTodo($id: String!) {
  removeTodo(id: $id)
}
    `;
export const useRemoveTodoMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RemoveTodoMutation, TError, RemoveTodoMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RemoveTodoMutation, TError, RemoveTodoMutationVariables, TContext>(
      ['removeTodo'],
      (variables?: RemoveTodoMutationVariables) => fetcher<RemoveTodoMutation, RemoveTodoMutationVariables>(client, RemoveTodoDocument, variables, headers)(),
      options
    );
export const SignInDocument = `
    mutation signIn($user: LoginInput!) {
  signIn(user: $user) {
    accessToken
  }
}
    `;
export const useSignInMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignInMutation, TError, SignInMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignInMutation, TError, SignInMutationVariables, TContext>(
      ['signIn'],
      (variables?: SignInMutationVariables) => fetcher<SignInMutation, SignInMutationVariables>(client, SignInDocument, variables, headers)(),
      options
    );
export const SignUpDocument = `
    mutation signUp($createUserInput: CreateUserInput!) {
  signUp(createUserInput: $createUserInput) {
    accessToken
  }
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      ['signUp'],
      (variables?: SignUpMutationVariables) => fetcher<SignUpMutation, SignUpMutationVariables>(client, SignUpDocument, variables, headers)(),
      options
    );
export const UpdateTodoDocument = `
    mutation updateTodo($updateTodoInput: UpdateTodoInput!) {
  updateTodo(updateTodoInput: $updateTodoInput) {
    action
    category
    id
    isDone
  }
}
    `;
export const useUpdateTodoMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateTodoMutation, TError, UpdateTodoMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateTodoMutation, TError, UpdateTodoMutationVariables, TContext>(
      ['updateTodo'],
      (variables?: UpdateTodoMutationVariables) => fetcher<UpdateTodoMutation, UpdateTodoMutationVariables>(client, UpdateTodoDocument, variables, headers)(),
      options
    );
export const UpdateUserDetailsDocument = `
    mutation updateUserDetails($paginationInput: FindPaginatedTodosInput!, $updateUserInput: UpdateUserInput!) {
  updateUserDetails(updateUserInput: $updateUserInput) {
    email
    firstName
    id
    lastName
    registrationDate
    registrationNumber
    todos(paginationInput: $paginationInput) {
      action
      category
      id
      isDone
    }
    userName
  }
}
    `;
export const useUpdateUserDetailsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserDetailsMutation, TError, UpdateUserDetailsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserDetailsMutation, TError, UpdateUserDetailsMutationVariables, TContext>(
      ['updateUserDetails'],
      (variables?: UpdateUserDetailsMutationVariables) => fetcher<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>(client, UpdateUserDetailsDocument, variables, headers)(),
      options
    );
export const FetchTodosDocument = `
    query fetchTodos($paginationInput: FindPaginatedTodosInput!) {
  fetchTodos(paginationInput: $paginationInput) {
    action
    category
    id
    isDone
  }
}
    `;
export const useFetchTodosQuery = <
      TData = FetchTodosQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FetchTodosQueryVariables,
      options?: UseQueryOptions<FetchTodosQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FetchTodosQuery, TError, TData>(
      ['fetchTodos', variables],
      fetcher<FetchTodosQuery, FetchTodosQueryVariables>(client, FetchTodosDocument, variables, headers),
      options
    );
export const GetCurrentAuthenticatedUserDocument = `
    query getCurrentAuthenticatedUser($paginationInput: FindPaginatedTodosInput!) {
  getCurrentAuthenticatedUser {
    email
    firstName
    id
    lastName
    registrationDate
    registrationNumber
    todos(paginationInput: $paginationInput) {
      action
      category
      id
      isDone
    }
    userName
  }
}
    `;
export const useGetCurrentAuthenticatedUserQuery = <
      TData = GetCurrentAuthenticatedUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCurrentAuthenticatedUserQueryVariables,
      options?: UseQueryOptions<GetCurrentAuthenticatedUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCurrentAuthenticatedUserQuery, TError, TData>(
      ['getCurrentAuthenticatedUser', variables],
      fetcher<GetCurrentAuthenticatedUserQuery, GetCurrentAuthenticatedUserQueryVariables>(client, GetCurrentAuthenticatedUserDocument, variables, headers),
      options
    );
export const GetUserByEmailDocument = `
    query getUserByEmail($paginationInput: FindPaginatedTodosInput!, $user: GetUserByEmailInput!) {
  getUserByEmail(user: $user) {
    email
    firstName
    id
    lastName
    registrationDate
    registrationNumber
    todos(paginationInput: $paginationInput) {
      action
      category
      id
      isDone
    }
    userName
  }
}
    `;
export const useGetUserByEmailQuery = <
      TData = GetUserByEmailQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUserByEmailQueryVariables,
      options?: UseQueryOptions<GetUserByEmailQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserByEmailQuery, TError, TData>(
      ['getUserByEmail', variables],
      fetcher<GetUserByEmailQuery, GetUserByEmailQueryVariables>(client, GetUserByEmailDocument, variables, headers),
      options
    );
export const GetUserByUserNameDocument = `
    query getUserByUserName($paginationInput: FindPaginatedTodosInput!, $user: GetUserByUserNameInput!) {
  getUserByUserName(user: $user) {
    email
    firstName
    id
    lastName
    registrationDate
    registrationNumber
    todos(paginationInput: $paginationInput) {
      action
      category
      id
      isDone
    }
    userName
  }
}
    `;
export const useGetUserByUserNameQuery = <
      TData = GetUserByUserNameQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUserByUserNameQueryVariables,
      options?: UseQueryOptions<GetUserByUserNameQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserByUserNameQuery, TError, TData>(
      ['getUserByUserName', variables],
      fetcher<GetUserByUserNameQuery, GetUserByUserNameQueryVariables>(client, GetUserByUserNameDocument, variables, headers),
      options
    );
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateTodoInput = {
  action: Scalars['String'];
  category?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  /** Email */
  email: Scalars['String'];
  /** First Name */
  firstName: Scalars['String'];
  /** Last Name */
  lastName?: InputMaybe<Scalars['String']>;
  /** Pass */
  password: Scalars['String'];
  /** User Name */
  userName: Scalars['String'];
};

export type FindPaginatedTodosInput = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type GetUserByEmailInput = {
  email: Scalars['String'];
};

export type GetUserByUserNameInput = {
  userName: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: Todo;
  removeTodo?: Maybe<Scalars['String']>;
  signIn: LoginResponse;
  signUp: LoginResponse;
  updateTodo: Todo;
  updateUserDetails: UserEntity;
};


export type MutationAddTodoArgs = {
  createTodoInput: CreateTodoInput;
};


export type MutationRemoveTodoArgs = {
  id: Scalars['String'];
};


export type MutationSignInArgs = {
  user: LoginInput;
};


export type MutationSignUpArgs = {
  createUserInput: CreateUserInput;
};


export type MutationUpdateTodoArgs = {
  updateTodoInput: UpdateTodoInput;
};


export type MutationUpdateUserDetailsArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  fetchTodos: Array<Todo>;
  getCurrentAuthenticatedUser: UserEntity;
  getUserByEmail?: Maybe<UserEntity>;
  getUserByUserName?: Maybe<UserEntity>;
};


export type QueryFetchTodosArgs = {
  paginationInput: FindPaginatedTodosInput;
};


export type QueryGetUserByEmailArgs = {
  user: GetUserByEmailInput;
};


export type QueryGetUserByUserNameArgs = {
  user: GetUserByUserNameInput;
};

export type Todo = {
  __typename?: 'Todo';
  action: Scalars['String'];
  category: Scalars['String'];
  id: Scalars['String'];
  isDone: Scalars['Boolean'];
};

export type UpdateTodoInput = {
  action?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  isDone?: InputMaybe<Scalars['Boolean']>;
  todoId: Scalars['String'];
};

export type UpdateUserInput = {
  /** Email */
  email?: InputMaybe<Scalars['String']>;
  /** First Name */
  firstName?: InputMaybe<Scalars['String']>;
  /** Last Name */
  lastName?: InputMaybe<Scalars['String']>;
  /** Pass */
  password?: InputMaybe<Scalars['String']>;
  /** User Name */
  userName?: InputMaybe<Scalars['String']>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  registrationDate: Scalars['DateTime'];
  registrationNumber: Scalars['Float'];
  todos: Array<Todo>;
  userName: Scalars['String'];
};


export type UserEntityTodosArgs = {
  paginationInput: FindPaginatedTodosInput;
};

export type AddTodoMutationVariables = Exact<{
  createTodoInput: CreateTodoInput;
}>;


export type AddTodoMutation = { __typename?: 'Mutation', addTodo: { __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean } };

export type RemoveTodoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveTodoMutation = { __typename?: 'Mutation', removeTodo?: string | null };

export type SignInMutationVariables = Exact<{
  user: LoginInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'LoginResponse', accessToken: string } };

export type SignUpMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'LoginResponse', accessToken: string } };

export type UpdateTodoMutationVariables = Exact<{
  updateTodoInput: UpdateTodoInput;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean } };

export type UpdateUserDetailsMutationVariables = Exact<{
  paginationInput: FindPaginatedTodosInput;
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserDetailsMutation = { __typename?: 'Mutation', updateUserDetails: { __typename?: 'UserEntity', email: string, firstName: string, id: string, lastName?: string | null, registrationDate: any, registrationNumber: number, userName: string, todos: Array<{ __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean }> } };

export type FetchTodosQueryVariables = Exact<{
  paginationInput: FindPaginatedTodosInput;
}>;


export type FetchTodosQuery = { __typename?: 'Query', fetchTodos: Array<{ __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean }> };

export type GetCurrentAuthenticatedUserQueryVariables = Exact<{
  paginationInput: FindPaginatedTodosInput;
}>;


export type GetCurrentAuthenticatedUserQuery = { __typename?: 'Query', getCurrentAuthenticatedUser: { __typename?: 'UserEntity', email: string, firstName: string, id: string, lastName?: string | null, registrationDate: any, registrationNumber: number, userName: string, todos: Array<{ __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean }> } };

export type GetUserByEmailQueryVariables = Exact<{
  paginationInput: FindPaginatedTodosInput;
  user: GetUserByEmailInput;
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', getUserByEmail?: { __typename?: 'UserEntity', email: string, firstName: string, id: string, lastName?: string | null, registrationDate: any, registrationNumber: number, userName: string, todos: Array<{ __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean }> } | null };

export type GetUserByUserNameQueryVariables = Exact<{
  paginationInput: FindPaginatedTodosInput;
  user: GetUserByUserNameInput;
}>;


export type GetUserByUserNameQuery = { __typename?: 'Query', getUserByUserName?: { __typename?: 'UserEntity', email: string, firstName: string, id: string, lastName?: string | null, registrationDate: any, registrationNumber: number, userName: string, todos: Array<{ __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean }> } | null };
