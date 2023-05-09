import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

function FileInfo() {
  const { filename } = useParams();
  const [fileContent, setFileContent] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/file/${filename}`)
      .then((response) => {
        setFileContent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filename]);

  return (
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
  );
}

export default FileInfo;
