import React from 'react';
import { Empty, Typography } from 'antd';

const { Text } = Typography;

function DataPoint(props) {
  const { data, title } = props;
  const validData = (
    <div>
      <Text strong>{title}: </Text>
      <Text>{data}</Text>
    </div>
  );
  return <div>{data ? validData : <Empty />}</div>;
}

export default DataPoint;
