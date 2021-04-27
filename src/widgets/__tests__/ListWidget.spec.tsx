import { cleanup, render } from '@testing-library/react';

import ListWidget from '../ListWidget';

afterEach(cleanup);

describe('ListWidget Widget', () => {
  const dataLayer = {
    loading: false,
    postsLoading: false,
    translate: jest.fn(),
    updatePosts: jest.fn(),
    theme: '',
    token: '',
    widget: '',
    language: '',
    height: '',
    width: '',
  };

  it('widget exists', () => {
    const { getByTestId } = render(<ListWidget data={dataLayer} />);
    expect(getByTestId('list-widget')).toBeTruthy();
  });
});
