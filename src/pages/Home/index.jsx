import React, { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import { Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Container from '../../components/Container';

function Home() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOk, setIsOk] = useState(false);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:3000/files/list')
      .then((response) => {
        setIsOk(true);
        setFiles(response.data.files);
      })
      .catch((error) => {
        setIsOk(false);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClick = useCallback(
    (file) => {
      navigate(`/${file}`);
    },
    [navigate]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isOk) {
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

export default memo(Home);
