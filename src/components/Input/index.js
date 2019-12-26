import React from 'react';
import './Input.scss';

export default props => {
  return (
    <div className="create-new-file-input-container">
      <input className="create-new-file-input" {...props} />
      <p>{props.error}</p>
    </div>
  );
};
