import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

import Home from '..';

jest.mock('axios');

describe('Home', () => {
  it('should render file names after successful API call', async () => {
    const files = ['file1.txt', 'file2.txt'];
    axios.get.mockResolvedValue({ data: { files } });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('file1.txt')).toBeInTheDocument()
    );
    expect(screen.getByText('file2.txt')).toBeInTheDocument();
  });

  it('should render error message after failed API call', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch files'));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Error fetching files')).toBeInTheDocument()
    );
  });
});
