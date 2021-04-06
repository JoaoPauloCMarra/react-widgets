import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Widget1 from '../src/widgets/Widget1';

afterEach(cleanup);

describe('Widget1', () => {
  it('title exists', () => {
    const { getByTestId } = render(<Widget1 />);
    expect(getByTestId('title')).toBeTruthy();
  });
  it('title has the righ text', () => {
    const { getByTestId } = render(<Widget1 />);
    expect(getByTestId('title').textContent).toBe('Widget1');
  });
});
