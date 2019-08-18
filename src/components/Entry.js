import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, Popconfirm } from 'antd';
import { startRemoveEntry } from '../redux/actions/journal';
import moment from 'moment';

function Entry(props) {
  const { entry, startRemoveEntry } = props;
  const { date, food, id, movement, notes, pain, travel, supplements } = entry;

  return (
    <div>
      <p>
        date: {moment(date).format('MMM D, YYYY')}
        <br />
        id: {id}
        <br />
        notes: {notes}
        <br />
        location: {travel.location}
        <br />
        pain: {pain.rating} - {pain.details}
        <br />
        supplements:{' '}
        {supplements.length > 0
          ? supplements.map(supplement => `${supplement}, `)
          : 'none'}
        <br />
        movement:{' '}
        {movement.length > 0
          ? movement.map(movement => `${movement.type} ${movement.details}, `)
          : 'none'}
        <br />
        meals:{' '}
        {food.meals.length > 0
          ? food.meals.map(meal => `${meal.type} ${meal.time} ${meal.notes}, `)
          : 'none'}
      </p>
      <Form.Item>
        <Link to={`/edit/${id}`}>
          <Button type="primary">Edit</Button>
        </Link>
        <Popconfirm
          cancelText="No"
          okText="Yes"
          onConfirm={() => startRemoveEntry(id)}
          title={'Are you sure you want to delete this entry?'}
        >
          <Button style={{ marginLeft: 8 }} type="primary">
            Remove
          </Button>
        </Popconfirm>
      </Form.Item>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  startRemoveEntry: id => dispatch(startRemoveEntry(id))
});

export default connect(
  null,
  mapDispatchToProps
)(Entry);
