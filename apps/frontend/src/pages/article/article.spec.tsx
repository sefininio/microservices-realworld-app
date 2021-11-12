import React from 'react';
import { render } from '@testing-library/react';

import Article from './article';

describe('Article', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Article />);
    expect(baseElement).toBeTruthy();
  });
});
