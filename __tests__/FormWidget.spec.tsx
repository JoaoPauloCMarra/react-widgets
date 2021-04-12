import { cleanup, render } from '@testing-library/react';

import FormWidget from '../src/widgets/FormWidget';

afterEach(cleanup);

describe('FormWidget Widget', () => {
  it('title exists', () => {
    const { getByTestId } = render(<FormWidget />);
    expect(getByTestId('title')).toBeTruthy();
  });
  it('subtitle exists', () => {
    const { getByTestId } = render(<FormWidget />);
    expect(getByTestId('subtitle')).toBeTruthy();
  });
});
