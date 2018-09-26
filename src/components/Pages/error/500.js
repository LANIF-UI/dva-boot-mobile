import React from 'react';

export default (prop) => (
  <div className="error-page">
    <div className="error-image"></div>
    <div className="error-content">
      <label>错误原因：</label>
      <div>{prop.content}</div>
    </div>
  </div>
);