import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
// Generated on 2021-03-20T22:56:43+02:00

export const AuthorFragmentDoc = gql`
  fragment author on User {
    _id
    image
    username
  }
`;
export const CommentWithAuthorFragmentDoc = gql`
  fragment commentWithAuthor on Comment {
    _id
    body
    createdAt
    author {
      ...author
    }
  }
  ${AuthorFragmentDoc}
`;
export const ArticleWithCommentsAndAuthorFragmentDoc = gql`
  fragment articleWithCommentsAndAuthor on Article {
    _id
    body
    description
    favoritesCount
    tagList
    title
    comments {
      ...commentWithAuthor
    }
    author {
      ...author
    }
  }
  ${CommentWithAuthorFragmentDoc}
  ${AuthorFragmentDoc}
`;
export const ArticleFragmentDoc = gql`
  fragment article on Article {
    _id
    body
    description
    favoritesCount
    tagList
    title
  }
`;
export const ArticleWithAuthorFragmentDoc = gql`
  fragment articleWithAuthor on Article {
    _id
    body
    description
    favoritesCount
    tagList
    title
    author {
      ...author
    }
  }
  ${AuthorFragmentDoc}
`;
export const CommentFragmentDoc = gql`
  fragment comment on Comment {
    _id
    body
    createdAt
  }
`;
export const CommentDeletedFragmentDoc = gql`
  fragment commentDeleted on Comment {
    _id
    body
    createdAt
    deletedAt
  }
`;
export const ProfileFragmentDoc = gql`
  fragment profile on Profile {
    _id
    bio
    following
    image
    username
  }
`;
export const UserFragmentDoc = gql`
  fragment user on User {
    _id
    bio
    email
    image
    username
    updatedAt
  }
`;
export const ArticleWithCommentsFragmentDoc = gql`
  fragment articleWithComments on Article {
    _id
    body
    description
    favoritesCount
    tagList
    title
    comments {
      ...commentWithAuthor
    }
  }
  ${CommentWithAuthorFragmentDoc}
`;
export const UserWithArticlesFragmentDoc = gql`
  fragment userWithArticles on User {
    _id
    bio
    email
    image
    username
    updatedAt
    articles {
      ...articleWithComments
    }
  }
  ${ArticleWithCommentsFragmentDoc}
`;
export const AddFavoriteDocument = gql`
  mutation addFavorite($input: String!) {
    addFavorite(slug: $input) {
      ...articleWithComments
    }
  }
  ${ArticleWithCommentsFragmentDoc}
`;
export type AddFavoriteMutationFn = Apollo.MutationFunction<
  Types.AddFavoriteMutation,
  Types.AddFavoriteMutationVariables
>;

/**
 * __useAddFavoriteMutation__
 *
 * To run a mutation, you first call `useAddFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFavoriteMutation, { data, loading, error }] = useAddFavoriteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFavoriteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AddFavoriteMutation,
    Types.AddFavoriteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AddFavoriteMutation,
    Types.AddFavoriteMutationVariables
  >(AddFavoriteDocument, options);
}
export type AddFavoriteMutationHookResult = ReturnType<
  typeof useAddFavoriteMutation
>;
export type AddFavoriteMutationResult = Apollo.MutationResult<Types.AddFavoriteMutation>;
export type AddFavoriteMutationOptions = Apollo.BaseMutationOptions<
  Types.AddFavoriteMutation,
  Types.AddFavoriteMutationVariables
>;
export const AddFollowDocument = gql`
  mutation addFollow($input: String!) {
    addFollow(username: $input) {
      ...profile
    }
  }
  ${ProfileFragmentDoc}
`;
export type AddFollowMutationFn = Apollo.MutationFunction<
  Types.AddFollowMutation,
  Types.AddFollowMutationVariables
>;

/**
 * __useAddFollowMutation__
 *
 * To run a mutation, you first call `useAddFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFollowMutation, { data, loading, error }] = useAddFollowMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFollowMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AddFollowMutation,
    Types.AddFollowMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AddFollowMutation,
    Types.AddFollowMutationVariables
  >(AddFollowDocument, options);
}
export type AddFollowMutationHookResult = ReturnType<
  typeof useAddFollowMutation
>;
export type AddFollowMutationResult = Apollo.MutationResult<Types.AddFollowMutation>;
export type AddFollowMutationOptions = Apollo.BaseMutationOptions<
  Types.AddFollowMutation,
  Types.AddFollowMutationVariables
>;
export const CreateArticleDocument = gql`
  mutation createArticle($input: ArticleCreateInput!) {
    createArticle(createArticleData: $input) {
      ...articleWithAuthor
    }
  }
  ${ArticleWithAuthorFragmentDoc}
`;
export type CreateArticleMutationFn = Apollo.MutationFunction<
  Types.CreateArticleMutation,
  Types.CreateArticleMutationVariables
>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateArticleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateArticleMutation,
    Types.CreateArticleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.CreateArticleMutation,
    Types.CreateArticleMutationVariables
  >(CreateArticleDocument, options);
}
export type CreateArticleMutationHookResult = ReturnType<
  typeof useCreateArticleMutation
>;
export type CreateArticleMutationResult = Apollo.MutationResult<Types.CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateArticleMutation,
  Types.CreateArticleMutationVariables
>;
export const CreateCommentDocument = gql`
  mutation createComment($input: CommentCreateInput!) {
    createComment(createCommentData: $input) {
      ...commentWithAuthor
    }
  }
  ${CommentWithAuthorFragmentDoc}
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  Types.CreateCommentMutation,
  Types.CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateCommentMutation,
    Types.CreateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.CreateCommentMutation,
    Types.CreateCommentMutationVariables
  >(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult = Apollo.MutationResult<Types.CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateCommentMutation,
  Types.CreateCommentMutationVariables
>;
export const CreateUserDocument = gql`
  mutation createUser($input: UserCreateInput!) {
    createUser(createUserData: $input) {
      ...user
    }
  }
  ${UserFragmentDoc}
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  Types.CreateUserMutation,
  Types.CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateUserMutation,
    Types.CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.CreateUserMutation,
    Types.CreateUserMutationVariables
  >(CreateUserDocument, options);
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult = Apollo.MutationResult<Types.CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateUserMutation,
  Types.CreateUserMutationVariables
>;
export const DeleteArticleDocument = gql`
  mutation deleteArticle($input: String!) {
    deleteArticle(slug: $input) {
      ...articleWithAuthor
    }
  }
  ${ArticleWithAuthorFragmentDoc}
`;
export type DeleteArticleMutationFn = Apollo.MutationFunction<
  Types.DeleteArticleMutation,
  Types.DeleteArticleMutationVariables
>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteArticleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteArticleMutation,
    Types.DeleteArticleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DeleteArticleMutation,
    Types.DeleteArticleMutationVariables
  >(DeleteArticleDocument, options);
}
export type DeleteArticleMutationHookResult = ReturnType<
  typeof useDeleteArticleMutation
>;
export type DeleteArticleMutationResult = Apollo.MutationResult<Types.DeleteArticleMutation>;
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteArticleMutation,
  Types.DeleteArticleMutationVariables
>;
export const DeleteCommentDocument = gql`
  mutation deleteComment($input: CommentDeleteInput!) {
    deleteComment(deleteCommentData: $input) {
      ...commentDeleted
    }
  }
  ${CommentDeletedFragmentDoc}
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  Types.DeleteCommentMutation,
  Types.DeleteCommentMutationVariables
>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteCommentMutation,
    Types.DeleteCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DeleteCommentMutation,
    Types.DeleteCommentMutationVariables
  >(DeleteCommentDocument, options);
}
export type DeleteCommentMutationHookResult = ReturnType<
  typeof useDeleteCommentMutation
>;
export type DeleteCommentMutationResult = Apollo.MutationResult<Types.DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteCommentMutation,
  Types.DeleteCommentMutationVariables
>;
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
export const RemoveFavoriteDocument = gql`
  mutation removeFavorite($input: String!) {
    removeFavorite(slug: $input) {
      ...articleWithComments
    }
  }
  ${ArticleWithCommentsFragmentDoc}
`;
export type RemoveFavoriteMutationFn = Apollo.MutationFunction<
  Types.RemoveFavoriteMutation,
  Types.RemoveFavoriteMutationVariables
>;

/**
 * __useRemoveFavoriteMutation__
 *
 * To run a mutation, you first call `useRemoveFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFavoriteMutation, { data, loading, error }] = useRemoveFavoriteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveFavoriteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RemoveFavoriteMutation,
    Types.RemoveFavoriteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RemoveFavoriteMutation,
    Types.RemoveFavoriteMutationVariables
  >(RemoveFavoriteDocument, options);
}
export type RemoveFavoriteMutationHookResult = ReturnType<
  typeof useRemoveFavoriteMutation
>;
export type RemoveFavoriteMutationResult = Apollo.MutationResult<Types.RemoveFavoriteMutation>;
export type RemoveFavoriteMutationOptions = Apollo.BaseMutationOptions<
  Types.RemoveFavoriteMutation,
  Types.RemoveFavoriteMutationVariables
>;
export const RemoveFollowDocument = gql`
  mutation removeFollow($input: String!) {
    removeFollow(username: $input) {
      ...profile
    }
  }
  ${ProfileFragmentDoc}
`;
export type RemoveFollowMutationFn = Apollo.MutationFunction<
  Types.RemoveFollowMutation,
  Types.RemoveFollowMutationVariables
>;

/**
 * __useRemoveFollowMutation__
 *
 * To run a mutation, you first call `useRemoveFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFollowMutation, { data, loading, error }] = useRemoveFollowMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveFollowMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RemoveFollowMutation,
    Types.RemoveFollowMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RemoveFollowMutation,
    Types.RemoveFollowMutationVariables
  >(RemoveFollowDocument, options);
}
export type RemoveFollowMutationHookResult = ReturnType<
  typeof useRemoveFollowMutation
>;
export type RemoveFollowMutationResult = Apollo.MutationResult<Types.RemoveFollowMutation>;
export type RemoveFollowMutationOptions = Apollo.BaseMutationOptions<
  Types.RemoveFollowMutation,
  Types.RemoveFollowMutationVariables
>;
export const UpdateArticleDocument = gql`
  mutation updateArticle($input: ArticleUpdateInput!) {
    updateArticle(updateArticleData: $input) {
      ...articleWithAuthor
    }
  }
  ${ArticleWithAuthorFragmentDoc}
`;
export type UpdateArticleMutationFn = Apollo.MutationFunction<
  Types.UpdateArticleMutation,
  Types.UpdateArticleMutationVariables
>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArticleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateArticleMutation,
    Types.UpdateArticleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UpdateArticleMutation,
    Types.UpdateArticleMutationVariables
  >(UpdateArticleDocument, options);
}
export type UpdateArticleMutationHookResult = ReturnType<
  typeof useUpdateArticleMutation
>;
export type UpdateArticleMutationResult = Apollo.MutationResult<Types.UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateArticleMutation,
  Types.UpdateArticleMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($input: UserUpdateInput!) {
    updateUser(updateUserData: $input) {
      ...user
    }
  }
  ${UserFragmentDoc}
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  Types.UpdateUserMutation,
  Types.UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateUserMutation,
    Types.UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UpdateUserMutation,
    Types.UpdateUserMutationVariables
  >(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult = Apollo.MutationResult<Types.UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateUserMutation,
  Types.UpdateUserMutationVariables
>;
export const ArticlesDocument = gql`
  query articles($input: String) {
    articles(slug: $input) {
      ...articleWithComments
    }
  }
  ${ArticleWithCommentsFragmentDoc}
`;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticlesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.ArticlesQuery,
    Types.ArticlesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.ArticlesQuery, Types.ArticlesQueryVariables>(
    ArticlesDocument,
    options
  );
}
export function useArticlesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ArticlesQuery,
    Types.ArticlesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.ArticlesQuery, Types.ArticlesQueryVariables>(
    ArticlesDocument,
    options
  );
}
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<
  typeof useArticlesLazyQuery
>;
export type ArticlesQueryResult = Apollo.QueryResult<
  Types.ArticlesQuery,
  Types.ArticlesQueryVariables
>;
export function refetchArticlesQuery(variables?: Types.ArticlesQueryVariables) {
  return { query: ArticlesDocument, variables: variables };
}
export const MeDocument = gql`
  query me {
    me {
      ...user
      feed {
        ...articleWithComments
      }
      articles {
        ...articleWithComments
      }
    }
  }
  ${UserFragmentDoc}
  ${ArticleWithCommentsFragmentDoc}
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
export function refetchMeQuery(variables?: Types.MeQueryVariables) {
  return { query: MeDocument, variables: variables };
}
export const UserProfileDocument = gql`
  query userProfile($input: String!) {
    profile(username: $input) {
      ...profile
    }
  }
  ${ProfileFragmentDoc}
`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.UserProfileQuery,
    Types.UserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UserProfileQuery,
    Types.UserProfileQueryVariables
  >(UserProfileDocument, options);
}
export function useUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserProfileQuery,
    Types.UserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UserProfileQuery,
    Types.UserProfileQueryVariables
  >(UserProfileDocument, options);
}
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<
  typeof useUserProfileLazyQuery
>;
export type UserProfileQueryResult = Apollo.QueryResult<
  Types.UserProfileQuery,
  Types.UserProfileQueryVariables
>;
export function refetchUserProfileQuery(
  variables?: Types.UserProfileQueryVariables
) {
  return { query: UserProfileDocument, variables: variables };
}
export const UserByEmailDocument = gql`
  query userByEmail($input: String) {
    user(email: $input) {
      ...userWithArticles
    }
  }
  ${UserWithArticlesFragmentDoc}
`;

/**
 * __useUserByEmailQuery__
 *
 * To run a query within a React component, call `useUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByEmailQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserByEmailQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.UserByEmailQuery,
    Types.UserByEmailQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UserByEmailQuery,
    Types.UserByEmailQueryVariables
  >(UserByEmailDocument, options);
}
export function useUserByEmailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserByEmailQuery,
    Types.UserByEmailQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UserByEmailQuery,
    Types.UserByEmailQueryVariables
  >(UserByEmailDocument, options);
}
export type UserByEmailQueryHookResult = ReturnType<typeof useUserByEmailQuery>;
export type UserByEmailLazyQueryHookResult = ReturnType<
  typeof useUserByEmailLazyQuery
>;
export type UserByEmailQueryResult = Apollo.QueryResult<
  Types.UserByEmailQuery,
  Types.UserByEmailQueryVariables
>;
export function refetchUserByEmailQuery(
  variables?: Types.UserByEmailQueryVariables
) {
  return { query: UserByEmailDocument, variables: variables };
}
export const UserByIdDocument = gql`
  query userById($input: String) {
    user(id: $input) {
      ...userWithArticles
    }
  }
  ${UserWithArticlesFragmentDoc}
`;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.UserByIdQuery,
    Types.UserByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.UserByIdQuery, Types.UserByIdQueryVariables>(
    UserByIdDocument,
    options
  );
}
export function useUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserByIdQuery,
    Types.UserByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.UserByIdQuery, Types.UserByIdQueryVariables>(
    UserByIdDocument,
    options
  );
}
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<
  typeof useUserByIdLazyQuery
>;
export type UserByIdQueryResult = Apollo.QueryResult<
  Types.UserByIdQuery,
  Types.UserByIdQueryVariables
>;
export function refetchUserByIdQuery(variables?: Types.UserByIdQueryVariables) {
  return { query: UserByIdDocument, variables: variables };
}
export const UserByUsernameDocument = gql`
  query userByUsername($input: String) {
    user(email: $input) {
      ...userWithArticles
    }
  }
  ${UserWithArticlesFragmentDoc}
`;

/**
 * __useUserByUsernameQuery__
 *
 * To run a query within a React component, call `useUserByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByUsernameQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserByUsernameQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.UserByUsernameQuery,
    Types.UserByUsernameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UserByUsernameQuery,
    Types.UserByUsernameQueryVariables
  >(UserByUsernameDocument, options);
}
export function useUserByUsernameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserByUsernameQuery,
    Types.UserByUsernameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UserByUsernameQuery,
    Types.UserByUsernameQueryVariables
  >(UserByUsernameDocument, options);
}
export type UserByUsernameQueryHookResult = ReturnType<
  typeof useUserByUsernameQuery
>;
export type UserByUsernameLazyQueryHookResult = ReturnType<
  typeof useUserByUsernameLazyQuery
>;
export type UserByUsernameQueryResult = Apollo.QueryResult<
  Types.UserByUsernameQuery,
  Types.UserByUsernameQueryVariables
>;
export function refetchUserByUsernameQuery(
  variables?: Types.UserByUsernameQueryVariables
) {
  return { query: UserByUsernameDocument, variables: variables };
}
