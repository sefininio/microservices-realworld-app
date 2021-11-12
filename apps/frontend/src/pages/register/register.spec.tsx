import React from 'react';
import { render } from '@testing-library/react';

import Register from './register';

describe('Register', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Register />);
    expect(baseElement).toBeTruthy();
  });
});
