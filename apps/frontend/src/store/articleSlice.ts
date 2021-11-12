import { ArticleDto, UserDto } from '@microservices-realworld-example-app/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActiveArticle {
  article: ArticleDto;
  author: UserDto;
}

interface ArticleState {
  articles: ArticleDto[];
  articleFeed: ArticleDto[];
  activeArticle: ActiveArticle | null;
}

const initialState: ArticleState = {
  articles: [],
  articleFeed: [],
  activeArticle: null,
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<ArticleDto[]>) => {
      state.articles = action.payload;
    },
    setArticleFeed: (state, action: PayloadAction<ArticleDto[]>) => {
      state.articleFeed = action.payload;
    },
    setActiveArticle: (state, action: PayloadAction<ActiveArticle>) => {
      state.activeArticle = action.payload;
    },
  },
});

const { setArticles, setArticleFeed, setActiveArticle } = articleSlice.actions;

export {
  setArticles as setArticlesAction,
  setArticleFeed as setArticleFeedAction,
  setActiveArticle as setActiveArticleAction,
};

export default articleSlice.reducer;
