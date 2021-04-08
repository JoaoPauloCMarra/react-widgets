import { cleanup, render } from '@testing-library/react';

import DemoWidget from '../src/widgets/DemoWidget';

afterEach(cleanup);

describe('DemoWidget', () => {
  it('title exists', async () => {
    const { getByTestId } = render(<DemoWidget />);
    expect(getByTestId('title')).toBeTruthy();
  });
  it('subtitle exists', () => {
    const { getByTestId } = render(<DemoWidget />);
    expect(getByTestId('subtitle')).toBeTruthy();
  });
});
