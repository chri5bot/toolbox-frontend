import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axiosMock from 'axios';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import FileInfo from '..';

jest.mock('axios');

describe('FileInfo', () => {
  it('should display loading spinner while fetching file content', async () => {
    axiosMock.get.mockResolvedValue({ data: [] });
    const { getByText } = render(
      <MemoryRouter initialEntries={['/file.txt']}>
        <Routes>
          <Route path="/:filename" element={<FileInfo />} />
        </Routes>
      </MemoryRouter>
    );

    const loadingSpinner = getByText('Loading...');
    expect(loadingSpinner).toBeInTheDocument();

    await waitFor(() => {
      expect(axiosMock.get).toHaveBeenCalledWith(
        'http://localhost:3000/file/file.txt'
      );
    });
  });

  it('should display error message when file is empty or fetch fails', async () => {
    axiosMock.get.mockRejectedValue(new Error());
    const { getByText } = render(
      <MemoryRouter initialEntries={['/empty-file.txt']}>
        <Routes>
          <Route path="/:filename" element={<FileInfo />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const errorMessage = getByText(
        'Sorry, the file is empty or something went wrong'
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display file content', async () => {
    axiosMock.get.mockResolvedValue({
      data: [
        { text: 'Line 1', number: 1, hex: '0x01' },
        { text: 'Line 2', number: 2, hex: '0x02' },
      ],
    });
    const { getByText } = render(
      <MemoryRouter initialEntries={['/file.txt']}>
        <Routes>
          <Route path="/:filename" element={<FileInfo />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const fileName = getByText('File Name: file.txt');
      expect(fileName).toBeInTheDocument();

      const text1 = getByText('Line 1');
      expect(text1).toBeInTheDocument();

      const number1 = getByText('1');
      expect(number1).toBeInTheDocument();

      const hex1 = getByText('0x01');
      expect(hex1).toBeInTheDocument();

      const text2 = getByText('Line 2');
      expect(text2).toBeInTheDocument();

      const number2 = getByText('2');
      expect(number2).toBeInTheDocument();

      const hex2 = getByText('0x02');
      expect(hex2).toBeInTheDocument();
    });
  });
});
