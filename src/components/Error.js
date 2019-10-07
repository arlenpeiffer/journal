import React from 'react';
import { Alert } from 'antd';

function Error(props) {
  const { message } = props;
  return (
    <Alert
      message={message}
      showIcon
      type="warning"
      style={{ marginBottom: 24 }}
    />
  );
}

export default Error;
