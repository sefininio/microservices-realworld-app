import React from 'react';
import { render } from '@testing-library/react';

import Publish from './publish';

describe('Publish', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Publish />);
    expect(baseElement).toBeTruthy();
  });
});
