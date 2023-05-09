import React, { useMemo, useCallback } from 'react';
import axios from 'axios';
import { Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import useFetchData from '../../hooks/useFetchData';

import Container from '../../components/Container';

const URL = 'http://localhost:3000/files/list';

function Home() {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useFetchData(URL, []);

  const files = useMemo(() => {
    if (data && data.files) {
      return data.files;
    }
  }, [data]);

  const handleClick = useCallback(
    (file) => {
      navigate(`/${file}`);
    },
    [navigate]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && (isError || !files)) {
    return <div>Error fetching files</div>;
  }

  return (
    <Container>
      <Alert variant="info">
        Click on the file that you want to explore :)
      </Alert>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Filename</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file} onClick={() => handleClick(file)}>
              <td>{file}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;
