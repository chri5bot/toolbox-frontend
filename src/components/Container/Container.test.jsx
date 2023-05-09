import React from 'react';
import { render } from '@testing-library/react';
import Container from '.';

describe('Container', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Container>
        <p>Child component</p>
      </Container>
    );

    expect(getByText('Child component')).toBeInTheDocument();
  });
});
