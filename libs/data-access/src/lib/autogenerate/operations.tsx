import * as Types from './types';

// Generated on 2021-03-20T22:56:43+02:00

export type ArticleWithCommentsAndAuthorFragment = {
  __typename?: 'Article';
} & Pick<
  Types.Article,
  '_id' | 'body' | 'description' | 'favoritesCount' | 'tagList' | 'title'
> & {
    comments: Array<{ __typename?: 'Comment' } & CommentWithAuthorFragment>;
    author: { __typename?: 'User' } & AuthorFragment;
  };

export type ArticleWithCommentsFragment = { __typename?: 'Article' } & Pick<
  Types.Article,
  '_id' | 'body' | 'description' | 'favoritesCount' | 'tagList' | 'title'
> & { comments: Array<{ __typename?: 'Comment' } & CommentWithAuthorFragment> };

export type ArticleFragment = { __typename?: 'Article' } & Pick<
  Types.Article,
  '_id' | 'body' | 'description' | 'favoritesCount' | 'tagList' | 'title'
>;

export type ArticleWithAuthorFragment = { __typename?: 'Article' } & Pick<
  Types.Article,
  '_id' | 'body' | 'description' | 'favoritesCount' | 'tagList' | 'title'
> & { author: { __typename?: 'User' } & AuthorFragment };

export type CommentWithAuthorFragment = { __typename?: 'Comment' } & Pick<
  Types.Comment,
  '_id' | 'body' | 'createdAt'
> & { author: { __typename?: 'User' } & AuthorFragment };

export type CommentFragment = { __typename?: 'Comment' } & Pick<
  Types.Comment,
  '_id' | 'body' | 'createdAt'
>;

export type CommentDeletedFragment = { __typename?: 'Comment' } & Pick<
  Types.Comment,
  '_id' | 'body' | 'createdAt' | 'deletedAt'
>;

export type ProfileFragment = { __typename?: 'Profile' } & Pick<
  Types.Profile,
  '_id' | 'bio' | 'following' | 'image' | 'username'
>;

export type UserFragment = { __typename?: 'User' } & Pick<
  Types.User,
  '_id' | 'bio' | 'email' | 'image' | 'username' | 'updatedAt'
>;

export type UserWithArticlesFragment = { __typename?: 'User' } & Pick<
  Types.User,
  '_id' | 'bio' | 'email' | 'image' | 'username' | 'updatedAt'
> & {
    articles: Array<{ __typename?: 'Article' } & ArticleWithCommentsFragment>;
  };

export type AuthorFragment = { __typename?: 'User' } & Pick<
  Types.User,
  '_id' | 'image' | 'username'
>;

export type AddFavoriteMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;

export type AddFavoriteMutation = { __typename?: 'Mutation' } & {
  addFavorite: { __typename?: 'Article' } & ArticleWithCommentsFragment;
};

export type AddFollowMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;

export type AddFollowMutation = { __typename?: 'Mutation' } & {
  addFollow: { __typename?: 'Profile' } & ProfileFragment;
};

export type CreateArticleMutationVariables = Types.Exact<{
  input: Types.ArticleCreateInput;
}>;

export type CreateArticleMutation = { __typename?: 'Mutation' } & {
  createArticle: { __typename?: 'Article' } & ArticleWithAuthorFragment;
};

export type CreateCommentMutationVariables = Types.Exact<{
  input: Types.CommentCreateInput;
}>;

export type CreateCommentMutation = { __typename?: 'Mutation' } & {
  createComment: { __typename?: 'Comment' } & CommentWithAuthorFragment;
};

export type CreateUserMutationVariables = Types.Exact<{
  input: Types.UserCreateInput;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'User' } & UserFragment;
};

export type DeleteArticleMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;

export type DeleteArticleMutation = { __typename?: 'Mutation' } & {
  deleteArticle: { __typename?: 'Article' } & ArticleWithAuthorFragment;
};

export type DeleteCommentMutationVariables = Types.Exact<{
  input: Types.CommentDeleteInput;
}>;

export type DeleteCommentMutation = { __typename?: 'Mutation' } & {
  deleteComment: { __typename?: 'Comment' } & CommentDeletedFragment;
};

export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'Token' } & Pick<Types.Token, 'access_token'>;
};

export type RemoveFavoriteMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;

export type RemoveFavoriteMutation = { __typename?: 'Mutation' } & {
  removeFavorite: { __typename?: 'Article' } & ArticleWithCommentsFragment;
};

export type RemoveFollowMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;

export type RemoveFollowMutation = { __typename?: 'Mutation' } & {
  removeFollow: { __typename?: 'Profile' } & ProfileFragment;
};

export type UpdateArticleMutationVariables = Types.Exact<{
  input: Types.ArticleUpdateInput;
}>;

export type UpdateArticleMutation = { __typename?: 'Mutation' } & {
  updateArticle: { __typename?: 'Article' } & ArticleWithAuthorFragment;
};

export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UserUpdateInput;
}>;

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser: { __typename?: 'User' } & UserFragment;
};

export type ArticlesQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.Scalars['String']>;
}>;

export type ArticlesQuery = { __typename?: 'Query' } & {
  articles: Array<
    Types.Maybe<{ __typename?: 'Article' } & ArticleWithCommentsFragment>
  >;
};

export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & {
    feed: Array<{ __typename?: 'Article' } & ArticleWithCommentsFragment>;
    articles: Array<{ __typename?: 'Article' } & ArticleWithCommentsFragment>;
  } & UserFragment;
};

export type UserProfileQueryVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;

export type UserProfileQuery = { __typename?: 'Query' } & {
  profile: { __typename?: 'Profile' } & ProfileFragment;
};

export type UserByEmailQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.Scalars['String']>;
}>;

export type UserByEmailQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & UserWithArticlesFragment;
};

export type UserByIdQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.Scalars['String']>;
}>;

export type UserByIdQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & UserWithArticlesFragment;
};

export type UserByUsernameQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.Scalars['String']>;
}>;

export type UserByUsernameQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & UserWithArticlesFragment;
};
