import React, { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import { Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Container from '../../components/Container';

function Home() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    axios
      .get('http://localhost:3000/files/list')
      .then((response) => {
        setFiles(response.data.files);
      })
      .catch((error) => {
        console.log(error);
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

  return (
    <Container>
      <Alert variant="info">
        Click in the file that you want to explore :)
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
