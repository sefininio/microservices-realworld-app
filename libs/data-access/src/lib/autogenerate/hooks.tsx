import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
// Generated on 2021-03-20T16:22:31+02:00

export const UserFragmentFragmentDoc = gql`
  fragment userFragment on User {
    _id
    username
    email
  }
`;
export const ArticleFragmentFragmentDoc = gql`
  fragment articleFragment on Article {
    _id
    body
    description
    favoritesCount
    tagList
    title
    comments {
      _id
      body
      author {
        ...userFragment
      }
    }
    author {
      ...userFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(loginData: $input) {
      access_token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  Types.LoginMutation,
  Types.LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.LoginMutation,
    Types.LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.LoginMutation, Types.LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<Types.LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  Types.LoginMutation,
  Types.LoginMutationVariables
>;
export const MeDocument = gql`
  query me {
    me {
      ...userFragment
      feed {
        ...articleFragment
      }
      articles {
        ...articleFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${ArticleFragmentFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.MeQuery, Types.MeQueryVariables>(
    MeDocument,
    options
  );
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.MeQuery,
    Types.MeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.MeQuery, Types.MeQueryVariables>(
    MeDocument,
    options
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<
  Types.MeQuery,
  Types.MeQueryVariables
>;
