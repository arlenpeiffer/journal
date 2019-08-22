import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Popconfirm, Tabs } from 'antd';
import { startRemoveEntry } from '../redux/actions/journal';
import DataPoint from './DataPoint';
import moment from 'moment';
import capitalize from 'lodash.capitalize';

function Entry(props) {
  const { entry, startRemoveEntry } = props;
  const {
    date,
    food,
    id,
    mood,
    movement,
    notes,
    pain,
    sleep,
    stomach,
    supplements,
    travel
  } = entry;
  const Tab = Tabs.TabPane;

  const formattedDate = moment(date).format('MMM D, YYYY');

  const formatDuration = duration => {
    const hours = Math.floor(duration / 3600000);
    const minutes = (duration % 3600000) / 60000;
    return `${hours} hours ${minutes} minutes`;
  };

  const formatMealType = type => {
    switch (type) {
      case 0:
        return 'Breakfast';
      case 1:
        return 'Lunch';
      case 2:
        return 'Snack';
      case 3:
        return 'Dinner';
      case 4:
        return 'Dessert';
    }
  };

  const formatPainLevel = level => {
    switch (level) {
      case 0:
        return 'None';
      case 1:
        return 'Low';
      case 2:
        return 'Medium';
      case 3:
        return 'High';
      case 4:
        return 'Extreme';
    }
  };

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

  const buttonGroup = (
    <div>
      {editButton}
      {removeButton}
    </div>
  );

  return (
    <div>
      <Card
        actions={[
          <div>
            <Icon type="edit" /> Edit
          </div>,
          <div>
            <Icon type="bar-chart" /> Details
          </div>,
          <div>
            <Icon type="delete" /> Remove
          </div>
        ]}
        extra={buttonGroup}
        size="small"
        title={formattedDate}
      >
        <Tabs>
          <Tab tab="Diet" key="diet">
            <DataPoint label="Diet" data={food.diet.type} />
            <DataPoint label="Notes" data={food.diet.notes} />
          </Tab>

          <Tab tab="Meals" key="meals">
            {food.meals.map(meal => (
              <div>
                <DataPoint label="Meal" data={formatMealType(meal.type)} />
                <DataPoint
                  label="Time"
                  data={moment(meal.time).format('h:mm A')}
                />
                <DataPoint label="Notes" data={meal.notes} />
                <DataPoint
                  label="Items"
                  data={meal.items.map(item => (
                    <ul>
                      <li>
                        <DataPoint label="Name" data={item.name} />
                        <DataPoint label="Portion" data={item.portion} />
                        <DataPoint
                          label="Ingredients"
                          data={item.ingredients}
                        />
                        <DataPoint label="Notes" data={item.notes} />
                      </li>
                    </ul>
                  ))}
                />
              </div>
            ))}
          </Tab>

          <Tab tab="Mood" key="mood">
            <DataPoint
              label="Moods"
              data={mood.map(mood => capitalize(mood)).join(', ')}
            />
          </Tab>

          <Tab tab="Movement" key="movement">
            {movement.map(movement => (
              <div>
                <DataPoint label="Movement" data={movement.type} />
                <DataPoint label="Details" data={movement.details} />
              </div>
            ))}
          </Tab>

          <Tab tab="Notes" key="notes">
            <DataPoint label="Notes" data={notes} />
          </Tab>

          <Tab tab="Pain" key="pain">
            <DataPoint label="Level" data={formatPainLevel(pain.level)} />
            <DataPoint label="Details" data={pain.details} />
          </Tab>

          <Tab tab="Sleep" key="sleep">
            <DataPoint label="Amount" data={formatDuration(sleep.amount)} />
            <DataPoint label="Rating" data={sleep.rating} />
            <DataPoint label="Notes" data={sleep.notes} />
          </Tab>

          <Tab tab="Stomach" key="stomach">
            <DataPoint label="Rating" data={stomach.rating} />
            <DataPoint label="Notes" data={stomach.notes} />
          </Tab>

          <Tab tab="Supplements" key="supplements">
            <DataPoint label="Supplements" data={supplements.join(', ')} />
          </Tab>
        </Tabs>
      </Card>
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
