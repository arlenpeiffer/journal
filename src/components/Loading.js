import React from 'react';
import { Icon, Spin } from 'antd';

function Loading(props) {
  const { tip } = props;
  return <Spin indicator={<Icon type="loading" />} size="large" tip={tip} />;
}

export default Loading;
