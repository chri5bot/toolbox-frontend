import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '.';

describe('NotFound', () => {
  it('renders the not found message', () => {
    const { getByText } = render(<NotFound />);
    const messageElement = getByText(
      /Sorry, the page you are looking for could not be found./i
    );
    expect(messageElement).toBeInTheDocument();
  });
});
