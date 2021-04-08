import { cleanup, render } from '@testing-library/react';

import EmptyWidget from '../src/widgets/EmptyWidget';

afterEach(cleanup);

describe('EmptyWidget', () => {
  it('text exists', () => {
    const { getByTestId } = render(<EmptyWidget />);
    expect(getByTestId('text')).toBeTruthy();
  });
  it('text has the righ text', () => {
    const { getByTestId } = render(<EmptyWidget />);
    expect(getByTestId('text').textContent).toBe('Nothing to show');
  });
});
