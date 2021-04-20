import { getArticleComments } from '../../services/article.service';

const commentFeedResolver = async (article, { cursor }) => {
  // The cursor passed in by the client will be a
  // date ISO string. If no cursor is passed in,
  // set the cursor equal to the time at which the
  // first comment in the article was created.
  const articleComments = await getArticleComments(article.slug);
  if (articleComments.length === 0) {
    return {
      comments: [],
      cursor: null,
    }
  }

  if (!cursor) {
    cursor = articleComments[0].createdAt;
  }

  // limit is the number of comments we will return.
  // We could pass it in as an argument but in this
  // case let's use a static value.
  const limit = 2;

  // find index of comment created at time held in cursor
  const cursorCommentIndex = articleComments.findIndex(
    comment => comment.createdAt === cursor
  );

  // We need to return a new cursor to the client so that it
  // can find the next page. Let's set newCursor to the
  // createdAt time of the last message in this messageFeed:
  const newCursor = cursorCommentIndex + limit <= articleComments.length
    ? articleComments[cursorCommentIndex + limit].createdAt
    : null;

  const commentFeed = {
    comments: articleComments.slice(
      cursorCommentIndex,
      cursorCommentIndex + limit
    ),
    cursor: newCursor,
  };

  return commentFeed;
}

export default commentFeedResolver;
