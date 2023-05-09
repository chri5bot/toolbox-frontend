import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';

function Container({ children }) {
  return (
    <div>
      <Navigation />
      <div className="mx-auto m-5" style={{ width: '1080px' }}>
        {children}
      </div>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default memo(Container);
