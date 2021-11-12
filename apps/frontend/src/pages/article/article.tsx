import { Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import {
  StyledArticle,
  StyledArticleAuthor,
  StyledArticleBody,
  StyledArticleContent,
  StyledArticleSidebar,
  StyledArticleTags,
} from './article.styled';

/* eslint-disable-next-line */
export interface ArticleProps {}

export function Article(props: ArticleProps) {
  const {
    activeArticle: { article, author },
  } = useAppSelector((state) => state.article);

// -------------------------
//  !!!!! Why does it not survive refresh?????
// -------------------------

  return (
    <StyledArticle>
      <Typography variant="h3">{article.title}</Typography>
      <StyledArticleContent>
        <StyledArticleBody>
          <Typography variant="h6">{article.body}</Typography>
        </StyledArticleBody>
        <StyledArticleSidebar>
          <StyledArticleAuthor>Author: {author.username}</StyledArticleAuthor>
          <StyledArticleTags>{article.tagList.join(', ')}</StyledArticleTags>
        </StyledArticleSidebar>
      </StyledArticleContent>
    </StyledArticle>
  );
}

export default Article;
