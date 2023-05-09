import React, { memo } from 'react';

import Container from '../../components/Container';
import BackButton from '../../components/BackButton';

const NotFound = () => {
  return (
    <Container>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
      <BackButton />
    </Container>
  );
};

export default memo(NotFound);
