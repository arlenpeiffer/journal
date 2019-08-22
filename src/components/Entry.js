import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Form, Icon, Popconfirm, Tabs } from 'antd';
import { startRemoveEntry } from '../redux/actions/journal';
import DataPoint from './DataPoint';
import moment from 'moment';

function Entry(props) {
  const { entry, startRemoveEntry } = props;
  const {
    date,
    food,
    id,
    movement,
    notes,
    pain,
    sleep,
    supplements,
    travel
  } = entry;
  const { TabPane } = Tabs;

  const formattedDate = moment(date).format('MMM D, YYYY');

  const editButton = (
    <Link to={`/edit/${id}`}>
      <Button type="primary">Edit</Button>
    </Link>
  );

  const removeButton = (
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
  );

  // const buttons = (
  //   <div>
  //     {editButton}
  //     {removeButton}
  //   </div>
  // );

  return (
    <div>
      <Card
        actions={[
          <Icon type="edit" />,
          <Icon type="bar-chart" />,
          <Icon type="delete" />
        ]}
        // extra={buttons}
        size="small"
        title={formattedDate}
      >
        <Tabs>
          <TabPane tab="Diet" key="diet">
            <DataPoint title="Type" data={food.diet.type} />
            <DataPoint title="Notes" data={food.diet.notes} />
          </TabPane>
          <TabPane tab="Movement" key="movement">
            {movement.map(movement => (
              <div>
                <DataPoint title="Type" data={movement.type} />
                <DataPoint title="Details" data={movement.details} />
              </div>
            ))}
          </TabPane>
          <TabPane tab="Notes" key="notes">
            <DataPoint title="Notes" data={notes} />
          </TabPane>
          <TabPane tab="Sleep" key="sleep">
            <DataPoint title="Amount" data={sleep.amount} />
            <DataPoint title="Rating" data={sleep.rating} />
            <DataPoint title="Notes" data={sleep.notes} />
          </TabPane>
        </Tabs>
      </Card>
      {/* <p>
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
      </p> */}
      <Form.Item>
        {/* <Link to={`/edit/${id}`}>
          <Button type="primary">Edit</Button>
        </Link> */}
        {/* <Popconfirm
          cancelText="No"
          okText="Yes"
          onConfirm={() => startRemoveEntry(id)}
          title={'Are you sure you want to delete this entry?'}
        >
          <Button style={{ marginLeft: 8 }} type="primary">
            Remove
          </Button>
        </Popconfirm> */}
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
