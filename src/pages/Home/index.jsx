import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/files/list')
      .then((response) => {
        setFiles(response.data.files);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = (file) => {
    console.log(file);
    navigate(`/${file}`);
  };

  return (
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
  );
}

export default Home;
