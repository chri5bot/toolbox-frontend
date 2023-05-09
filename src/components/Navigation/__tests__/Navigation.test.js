import React from 'react';
import { render } from '@testing-library/react';
import Navigation from '../index';

describe('Navigation', () => {
  test('renders Navigation component with Home link', () => {
    const { getByText } = render(<Navigation />);
    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });
});
