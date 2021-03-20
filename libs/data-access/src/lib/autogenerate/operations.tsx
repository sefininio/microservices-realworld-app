import * as Types from './schemas';

// Generated on 2021-03-20T16:09:23+02:00

export type ArticleFragmentFragment = { __typename?: 'Article' } & Pick<
  Types.Article,
  '_id' | 'body' | 'description' | 'favoritesCount' | 'tagList' | 'title'
> & {
    comments: Array<
      { __typename?: 'Comment' } & Pick<Types.Comment, '_id' | 'body'> & {
          author: { __typename?: 'User' } & UserFragmentFragment;
        }
    >;
    author: { __typename?: 'User' } & UserFragmentFragment;
  };

export type UserFragmentFragment = { __typename?: 'User' } & Pick<
  Types.User,
  '_id' | 'username' | 'email'
>;

export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'Token' } & Pick<Types.Token, 'access_token'>;
};

export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & {
    feed: Array<{ __typename?: 'Article' } & ArticleFragmentFragment>;
    articles: Array<{ __typename?: 'Article' } & ArticleFragmentFragment>;
  } & UserFragmentFragment;
};
