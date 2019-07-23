import React from 'react';
import { connect } from 'react-redux';
import { sortByNewestFirst, sortByOldestFirst } from '../redux/actions/filters';
import { Select } from 'antd';

function Filters(props) {
  const { sortByNewestFirst, sortByOldestFirst } = props;

  return (
    <div>
      <Select
        defaultValue={0}
        onChange={value => {
          value === 0 && sortByNewestFirst();
          value === 1 && sortByOldestFirst();
        }}
      >
        <Select.Option value={0}>Newest First</Select.Option>
        <Select.Option value={1}>Oldest First</Select.Option>
      </Select>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  sortByNewestFirst: () => dispatch(sortByNewestFirst()),
  sortByOldestFirst: () => dispatch(sortByOldestFirst())
});

export default connect(
  null,
  mapDispatchToProps
)(Filters);
