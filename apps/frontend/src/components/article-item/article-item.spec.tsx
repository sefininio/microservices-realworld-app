import React from 'react';
import { render } from '@testing-library/react';

import ArticleItem from './article-item';
import { IArticle } from '../../types';

describe('ArticleItem', () => {
  it('should render successfully', () => {
    const article: IArticle = {
      _id: '',
      slug: '',
      authorId: '',
      title: '',
      description: '',
      body: '',
      tagList: [],
      favoritesCount: 0,
      createdAt: '',
      updatedAt: '',
      deletedAt: '',

    };
    const { baseElement } = render(<ArticleItem article={article} />);
    expect(baseElement).toBeTruthy();
  });
});
