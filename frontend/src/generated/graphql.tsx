import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  register?: Maybe<UserResponse>;
};

export type MutationRegisterArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  login?: Maybe<UserResponse>;
};

export type QueryLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type User = {
  __typename?: "User";
  PUUID: Scalars["String"];
  _id: Scalars["String"];
  email: Scalars["String"];
  isCertified: Scalars["Boolean"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
};

export type RegularUserFragment = {
  __typename?: "User";
  username: string;
  certificateLevel: number;
};

export type RegularUserResponseFragment = {
  __typename?: "UserResponse";
  errors?: Array<{
    __typename?: "FieldError";
    field: string;
    message: string;
  }> | null;
  user?: {
    __typename?: "User";
    username: string;
    certificateLevel: number;
  } | null;
};

export type RegisterMutationVariables = Exact<{
  email: Scalars["String"];
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register?: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      username: string;
      certificateLevel: number;
    } | null;
  } | null;
};

export type LoginQueryVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginQuery = {
  __typename?: "Query";
  login?: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      username: string;
      certificateLevel: number;
    } | null;
  } | null;
};

export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    username
    certificateLevel
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const RegisterDocument = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const LoginDocument = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useLoginQuery(
  options: Omit<Urql.UseQueryArgs<LoginQueryVariables>, "query">
) {
  return Urql.useQuery<LoginQuery, LoginQueryVariables>({
    query: LoginDocument,
    ...options,
  });
}
