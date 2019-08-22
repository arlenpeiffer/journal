import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

function DataPoint(props) {
  const { data, label } = props;
  return (
    <div>
      <Text strong>{label}: </Text>
      <Text disabled={!data}>{data ? data : '---'}</Text>
    </div>
  );
}

export default DataPoint;
