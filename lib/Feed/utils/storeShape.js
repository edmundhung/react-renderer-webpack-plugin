import React, { PropTypes } from 'react';

const storeShape = React.PropTypes.shape({
  getState: PropTypes.func.isRequired,
});

export default storeShape;
