import React from 'react';
import { render, screen } from '@testing-library/react';
import BackButton from '..';

describe('BackButton component', () => {
  it('renders a button with the text "Back" and correct href', () => {
    render(<BackButton />);

    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/');
  });
});
