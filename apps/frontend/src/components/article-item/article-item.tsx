import { ArticleDto } from '@microservices-realworld-example-app/models';
import { CardContent, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router';
import { useGetUserById } from '../../hooks';
import { setActiveArticleAction } from '../../store/articleSlice';
import { useAppDispatch } from '../../store/hooks';
import {
  StyledCard,
  StyledCardAuthorDetails,
  StyledCardDetails,
  StyledCardTagDetails,
  StyledPostItem
} from './article-item.styled';

/* eslint-disable-next-line */
export interface ArticleItemProps {
  article: ArticleDto;
}

export function ArticleItem({ article }: ArticleItemProps) {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [{ data: author, loading }, refetch] = useGetUserById({
    id: article.authorId,
  });

  const handleClick = () => {
    dispatch(setActiveArticleAction({article, author}));
    history.push('/article');
  }

  if (loading) {
    return null;
  }

  return (
    <StyledPostItem onClick={handleClick}>
      <StyledCard elevation={6} >
        <CardContent>
          <Typography variant="h5">{article.title}</Typography>
          <StyledCardDetails>
            <StyledCardTagDetails>
              {article.tagList.join(', ')}
            </StyledCardTagDetails>
            <StyledCardAuthorDetails>
              {author?.username}
            </StyledCardAuthorDetails>
          </StyledCardDetails>
        </CardContent>
      </StyledCard>
    </StyledPostItem>
  );
}

export default ArticleItem;
