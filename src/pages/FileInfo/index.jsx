import React, { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import Container from '../../components/Container';

function FileInfo() {
  const { filename } = useParams();
  console.log('-----', filename);
  const [fileContent, setFileContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOk, setIsOk] = useState(false);

  const getFileContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/file/${filename}`);

      if (res.data && res.data.length > 0) {
        setFileContent(res.data);
        setIsOk(true);
      } else {
        setIsOk(false);
      }
    } catch (err) {
      setIsOk(false);
    }
    setIsLoading(false);
  }, [filename]);

  useEffect(() => {
    getFileContent();
  }, [getFileContent]);

  if (isLoading) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  if (!isOk && !isLoading) {
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
