import React, { memo } from 'react';

import { Button } from 'react-bootstrap';

import Container from '../../components/Container';

const NotFound = () => {
  return (
    <Container>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
      <Button href="/" variant="secondary">
        Back
      </Button>
    </Container>
  );
};

export default memo(NotFound);
