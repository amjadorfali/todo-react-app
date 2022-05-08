import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
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
  signIn: LoginResponse;
  signUp: UserEntity;
  updateTodo: Todo;
  updateUserDetails: UserEntity;
};


export type MutationAddTodoArgs = {
  createTodoInput: CreateTodoInput;
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
  password: Scalars['String'];
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

export type SignInMutationVariables = Exact<{
  user: LoginInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'LoginResponse', accessToken: string } };

export type SignUpMutationVariables = Exact<{
  paginationInput: FindPaginatedTodosInput;
  createUserInput: CreateUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'UserEntity', email: string, firstName: string, id: string, lastName?: string | null, password: string, registrationDate: any, registrationNumber: number, userName: string, todos: Array<{ __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean }> } };

export type UpdateTodoMutationVariables = Exact<{
  updateTodoInput: UpdateTodoInput;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean } };

export type UpdateUserDetailsMutationVariables = Exact<{
  paginationInput: FindPaginatedTodosInput;
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserDetailsMutation = { __typename?: 'Mutation', updateUserDetails: { __typename?: 'UserEntity', email: string, firstName: string, id: string, lastName?: string | null, password: string, registrationDate: any, registrationNumber: number, userName: string, todos: Array<{ __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean }> } };

export type FetchTodosQueryVariables = Exact<{
  paginationInput: FindPaginatedTodosInput;
}>;


export type FetchTodosQuery = { __typename?: 'Query', fetchTodos: Array<{ __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean }> };

export type GetCurrentAuthenticatedUserQueryVariables = Exact<{
  paginationInput: FindPaginatedTodosInput;
}>;


export type GetCurrentAuthenticatedUserQuery = { __typename?: 'Query', getCurrentAuthenticatedUser: { __typename?: 'UserEntity', email: string, firstName: string, id: string, lastName?: string | null, password: string, registrationDate: any, registrationNumber: number, userName: string, todos: Array<{ __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean }> } };

export type GetUserByEmailQueryVariables = Exact<{
  paginationInput: FindPaginatedTodosInput;
  user: GetUserByEmailInput;
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', getUserByEmail?: { __typename?: 'UserEntity', email: string, firstName: string, id: string, lastName?: string | null, password: string, registrationDate: any, registrationNumber: number, userName: string, todos: Array<{ __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean }> } | null };

export type GetUserByUserNameQueryVariables = Exact<{
  paginationInput: FindPaginatedTodosInput;
  user: GetUserByUserNameInput;
}>;


export type GetUserByUserNameQuery = { __typename?: 'Query', getUserByUserName?: { __typename?: 'UserEntity', email: string, firstName: string, id: string, lastName?: string | null, password: string, registrationDate: any, registrationNumber: number, userName: string, todos: Array<{ __typename?: 'Todo', action: string, category: string, id: string, isDone: boolean }> } | null };


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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AddTodoMutation, TError, AddTodoMutationVariables, TContext>
    ) =>
    useMutation<AddTodoMutation, TError, AddTodoMutationVariables, TContext>(
      ['addTodo'],
      (variables?: AddTodoMutationVariables) => fetcher<AddTodoMutation, AddTodoMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AddTodoDocument, variables)(),
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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<SignInMutation, TError, SignInMutationVariables, TContext>
    ) =>
    useMutation<SignInMutation, TError, SignInMutationVariables, TContext>(
      ['signIn'],
      (variables?: SignInMutationVariables) => fetcher<SignInMutation, SignInMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SignInDocument, variables)(),
      options
    );
export const SignUpDocument = `
    mutation signUp($paginationInput: FindPaginatedTodosInput!, $createUserInput: CreateUserInput!) {
  signUp(createUserInput: $createUserInput) {
    email
    firstName
    id
    lastName
    password
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
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>
    ) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      ['signUp'],
      (variables?: SignUpMutationVariables) => fetcher<SignUpMutation, SignUpMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SignUpDocument, variables)(),
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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateTodoMutation, TError, UpdateTodoMutationVariables, TContext>
    ) =>
    useMutation<UpdateTodoMutation, TError, UpdateTodoMutationVariables, TContext>(
      ['updateTodo'],
      (variables?: UpdateTodoMutationVariables) => fetcher<UpdateTodoMutation, UpdateTodoMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateTodoDocument, variables)(),
      options
    );
export const UpdateUserDetailsDocument = `
    mutation updateUserDetails($paginationInput: FindPaginatedTodosInput!, $updateUserInput: UpdateUserInput!) {
  updateUserDetails(updateUserInput: $updateUserInput) {
    email
    firstName
    id
    lastName
    password
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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateUserDetailsMutation, TError, UpdateUserDetailsMutationVariables, TContext>
    ) =>
    useMutation<UpdateUserDetailsMutation, TError, UpdateUserDetailsMutationVariables, TContext>(
      ['updateUserDetails'],
      (variables?: UpdateUserDetailsMutationVariables) => fetcher<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateUserDetailsDocument, variables)(),
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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: FetchTodosQueryVariables,
      options?: UseQueryOptions<FetchTodosQuery, TError, TData>
    ) =>
    useQuery<FetchTodosQuery, TError, TData>(
      ['fetchTodos', variables],
      fetcher<FetchTodosQuery, FetchTodosQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FetchTodosDocument, variables),
      options
    );
export const GetCurrentAuthenticatedUserDocument = `
    query getCurrentAuthenticatedUser($paginationInput: FindPaginatedTodosInput!) {
  getCurrentAuthenticatedUser {
    email
    firstName
    id
    lastName
    password
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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetCurrentAuthenticatedUserQueryVariables,
      options?: UseQueryOptions<GetCurrentAuthenticatedUserQuery, TError, TData>
    ) =>
    useQuery<GetCurrentAuthenticatedUserQuery, TError, TData>(
      ['getCurrentAuthenticatedUser', variables],
      fetcher<GetCurrentAuthenticatedUserQuery, GetCurrentAuthenticatedUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCurrentAuthenticatedUserDocument, variables),
      options
    );
export const GetUserByEmailDocument = `
    query getUserByEmail($paginationInput: FindPaginatedTodosInput!, $user: GetUserByEmailInput!) {
  getUserByEmail(user: $user) {
    email
    firstName
    id
    lastName
    password
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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUserByEmailQueryVariables,
      options?: UseQueryOptions<GetUserByEmailQuery, TError, TData>
    ) =>
    useQuery<GetUserByEmailQuery, TError, TData>(
      ['getUserByEmail', variables],
      fetcher<GetUserByEmailQuery, GetUserByEmailQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUserByEmailDocument, variables),
      options
    );
export const GetUserByUserNameDocument = `
    query getUserByUserName($paginationInput: FindPaginatedTodosInput!, $user: GetUserByUserNameInput!) {
  getUserByUserName(user: $user) {
    email
    firstName
    id
    lastName
    password
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
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUserByUserNameQueryVariables,
      options?: UseQueryOptions<GetUserByUserNameQuery, TError, TData>
    ) =>
    useQuery<GetUserByUserNameQuery, TError, TData>(
      ['getUserByUserName', variables],
      fetcher<GetUserByUserNameQuery, GetUserByUserNameQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUserByUserNameDocument, variables),
      options
    );