import { cleanup, render } from '@testing-library/react';

import ListWidget from '../ListWidget';

afterEach(cleanup);

describe('ListWidget Widget', () => {
  it('title exists', () => {
    const { getByTestId } = render(<ListWidget />);
    expect(getByTestId('title')).toBeTruthy();
  });
  it('subtitle exists', () => {
    const { getByTestId } = render(<ListWidget />);
    expect(getByTestId('subtitle')).toBeTruthy();
  });
});
