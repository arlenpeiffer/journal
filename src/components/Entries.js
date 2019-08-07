import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, List, Popconfirm, Rate, Table } from 'antd';
import { removeEntry } from '../redux/actions/journal';
import moment from 'moment';

function Entries(props) {
  const { journal, removeEntry } = props;
  const { Column } = Table;
  const { Item } = List;

  const getMealName = type => {
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

  const getPainLevel = rating => {
    switch (rating) {
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

  return (
    <div>
      <Table
        dataSource={journal}
        expandedRowRender={entry => {
          return (
            <List
              dataSource={[entry]}
              itemLayout="vertical"
              renderItem={entry => {
                const {
                  food,
                  mood,
                  movement,
                  notes,
                  pain,
                  sleep,
                  supplements,
                  travel
                } = entry;
                return (
                  <div>
                    <Item>
                      <Item.Meta title="Diet" description={food.diet.type} />
                    </Item>
                    <Item>
                      <Item.Meta
                        title="Location"
                        description={travel.location}
                      />
                    </Item>
                    <Item>
                      <Item.Meta
                        title="Meals"
                        description={
                          <div>
                            {food.meals.map((meal, index) => (
                              <div>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'left'
                                  }}
                                >
                                  <h4>{getMealName(meal.type)}</h4>
                                  <p style={{ marginBottom: 0, marginLeft: 8 }}>
                                    {moment(meal.time).format('h:m A')}
                                  </p>
                                </div>
                                <div>
                                  {meal.items.map(item => (
                                    <div>
                                      <p>{item.name}</p>
                                    </div>
                                  ))}
                                  <p>{meal.notes}</p>
                                </div>
                                {index + 1 !== food.meals.length ? (
                                  <Divider
                                    style={{ marginBottom: 12, marginTop: 8 }}
                                  />
                                ) : null}
                              </div>
                            ))}
                          </div>
                        }
                      />
                    </Item>
                    <Item>
                      <Item.Meta
                        title="Mood"
                        description={mood.length > 0 ? mood.join(', ') : '-'}
                      />
                    </Item>
                    <Item>
                      <Item.Meta
                        title="Movement"
                        description={
                          <div>
                            {movement.map(movement => (
                              <div>
                                <h4>{movement.type}</h4>
                                <p>{movement.details}</p>
                              </div>
                            ))}
                          </div>
                        }
                      />
                    </Item>
                    <Item key={entry.id}>
                      <Item.Meta
                        title="Notes"
                        description={notes ? notes : 'none'}
                      />
                    </Item>
                    <Item>
                      <Item.Meta
                        title="Pain"
                        description={
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div>
                              <h4>Level:</h4>
                              <p>{getPainLevel(pain.rating)}</p>
                            </div>
                            <div>
                              <h4>Rating:</h4>
                              <p>{pain.rating ? pain.rating : '0'}</p>
                            </div>
                            <div>
                              <h4>Details:</h4>
                              <p>{pain.details ? pain.details : 'none'}</p>
                            </div>
                          </div>
                        }
                      />
                    </Item>

                    <Item>
                      <Item.Meta
                        title="Sleep"
                        description={
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div>
                              <h4>Amount:</h4>
                              <p>{sleep.amount}</p>
                            </div>
                            <div>
                              <h4>Rating:</h4>
                              <Rate disabled value={sleep.rating} />
                            </div>
                            <div>
                              <h4>Notes:</h4>
                              <p>{sleep.notes}</p>
                            </div>
                          </div>
                        }
                      />
                    </Item>

                    <Item>
                      <Item.Meta
                        title="Supplements"
                        description={
                          supplements.length > 0
                            ? supplements.join(', ')
                            : 'none'
                        }
                      />
                    </Item>
                  </div>
                );
              }}
            />
          );
        }}
        pagination={false}
        rowKey={entry => entry.id}
      >
        <Column
          dataIndex="date"
          render={date => moment(date).format('MMM D, YYYY')}
          title="Date"
        />
        <Column
          dataIndex="id"
          key={id => `edit-${id}`}
          render={id => (
            <Link to={`/edit/${id}`}>
              <Button type="link">Edit</Button>
            </Link>
          )}
        />
        <Column
          dataIndex="id"
          key={id => `remove-${id}`}
          render={id => (
            <Popconfirm
              cancelText="No"
              okText="Yes"
              onConfirm={() => removeEntry(id)}
              title={'Are you sure you want to delete this entry?'}
            >
              <Button type="link">Remove</Button>
            </Popconfirm>
          )}
        />
      </Table>
    </div>
  );
}

const mapStateToProps = state => ({
  journal: state.user.journal
    .filter(entry => {
      const { startDate, endDate } = state.user.filters.date;
      const startDateMatch = startDate ? entry.date >= startDate : true;
      const endDateMatch = endDate ? entry.date <= endDate : true;
      const { text } = state.user.filters;
      const textMatch = text
        ? entry.food.meals.some(meal =>
            meal.items.some(item =>
              item.name.toLowerCase().includes(text.toLowerCase())
            )
          ) ||
          entry.food.meals.some(meal =>
            meal.items.some(item =>
              item.portion.toLowerCase().includes(text.toLowerCase())
            )
          ) ||
          entry.food.meals.some(meal =>
            meal.items.some(item =>
              item.notes.toLowerCase().includes(text.toLowerCase())
            )
          ) ||
          entry.food.meals.some(meal =>
            meal.notes.toLowerCase().includes(text.toLowerCase())
          ) ||
          entry.mood.some(mood =>
            mood.toLowerCase().includes(text.toLowerCase())
          ) ||
          entry.movement.some(movement =>
            movement.toLowerCase().includes(text.toLowerCase())
          ) ||
          entry.notes.toLowerCase().includes(text.toLowerCase()) ||
          entry.pain.details.toLowerCase().includes(text.toLowerCase()) ||
          entry.sleep.notes.toLowerCase().includes(text.toLowerCase()) ||
          entry.supplements.some(supplement =>
            supplement.toLowerCase().includes(text.toLowerCase())
          ) ||
          entry.travel.location.toLowerCase().includes(text.toLowerCase())
        : true;
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      const { sortOrder } = state.user.filters;
      if (sortOrder === 'newestFirst') return a.date > b.date ? -1 : 1;
      if (sortOrder === 'oldestFirst') return a.date < b.date ? -1 : 1;
    })
});

const mapDispatchToProps = dispatch => ({
  removeEntry: id => dispatch(removeEntry(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entries);
