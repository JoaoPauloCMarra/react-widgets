import { cleanup, render } from '@testing-library/react';

import EmptyWidget from '../EmptyWidget';

afterEach(cleanup);

describe('EmptyWidget', () => {
  it('text exists', () => {
    const { getByTestId } = render(<EmptyWidget />);
    expect(getByTestId('error-text')).toBeTruthy();
  });
  it('text has the righ text', () => {
    const { getByTestId } = render(<EmptyWidget />);
    expect(getByTestId('error-text').textContent).toBe('Nothing to show');
  });
});
