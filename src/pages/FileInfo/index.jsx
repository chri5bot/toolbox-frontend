import React, { useMemo, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import useFetchData from '../../hooks/useFetchData';

import Container from '../../components/Container';

function FileInfo() {
  const { filename } = useParams();
  const { isLoading, isError, data } = useFetchData(
    `http://localhost:3000/file/${filename}`,
    [filename]
  );

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
        <Button href="/" variant="secondary">
          Back
        </Button>
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
      <Button href="/" variant="secondary">
        Back
      </Button>
    </Container>
  );
}

export default memo(FileInfo);
