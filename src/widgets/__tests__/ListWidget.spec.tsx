import { cleanup, render } from '@testing-library/react';

import ListWidget from '../ListWidget';

afterEach(cleanup);

describe('ListWidget Widget', () => {
  it('list widget exists', () => {
    const { getByTestId } = render(<ListWidget />);
    expect(getByTestId('list-widget')).toBeTruthy();
  });
});
