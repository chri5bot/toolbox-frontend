import React, { useMemo, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import useFetchData from '../../hooks/useFetchData';

import Container from '../../components/Container';
import BackButton from '../../components/BackButton';

const URL = 'http://localhost:3000/file/';

function FileInfo() {
  const { filename } = useParams();
  const { isLoading, isError, data } = useFetchData(`${URL}${filename}`, [
    filename,
  ]);

  const fileContent = useMemo(() => {
    if (data) {
      return data;
    }
  }, [data]);

  if (isLoading) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  if (!isLoading && (isError || !fileContent || !fileContent.length > 0)) {
    return (
      <Container>
        <p>Sorry, the file is empty or something went wrong</p>
        <BackButton />
      </Container>
    );
  }

  return (
    <Container>
      <h2>File Name: {filename}</h2>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {fileContent.map((line, index) => (
              <tr key={index}>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td>{line.hex}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <BackButton />
    </Container>
  );
}

export default memo(FileInfo);
