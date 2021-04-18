import { cleanup, render } from '@testing-library/react';

import FormWidget from '../FormWidget';

afterEach(cleanup);

describe('FormWidget Widget', () => {
  it('widget exists', () => {
    const { getByTestId } = render(<FormWidget />);
    expect(getByTestId('form-widget')).toBeTruthy();
  });
});
