import React from 'react';
import { cleanup, render } from '@testing-library/react';

import EmptyWidget from '../src/widgets/EmptyWidget';

afterEach(cleanup);

describe('EmptyWidget', () => {
  it('title exists', () => {
    const { getByTestId } = render(<EmptyWidget />);
    expect(getByTestId('title')).toBeTruthy();
  });
  it('title has the righ text', () => {
    const { getByTestId } = render(<EmptyWidget />);
    expect(getByTestId('title').textContent).toBe('EmptyWidget');
  });
});
