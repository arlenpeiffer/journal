import React from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import moment from 'moment';

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

const formatLevel = level => {
  switch (level) {
    case 0:
      return 'None';
    case 1:
      return 'Low';
    case 2:
      return 'Moderate';
    case 3:
      return 'High';
    case 4:
      return 'Extreme';
  }
};

const formatSleepAmount = amountInMilliseconds => {
  const amountInHours = amountInMilliseconds / 3600000;
  const numberOfHours = Math.floor(amountInHours);
  const numberOfMinutes = (amountInHours - numberOfHours) * 60;
  const s = numberOfHours > 1 ? 's' : '';
  const hours = numberOfHours ? `${numberOfHours} hr${s}` : '';
  const minutes = `${numberOfMinutes} mins`;
  return `${hours} ${minutes}`;
};

const Printout = props => {
  const { journal, user } = props;

  const userName = user.name && `${user.name.first} ${user.name.last}`;

  return (
    <div>
      <Typography.Title>{userName}</Typography.Title>
      <Typography.Text code>
        Journal Printout {moment().format('MM-DD-YY')}
      </Typography.Text>
      {journal
        .sort((a, b) => {
          return a.date > b.date ? -1 : 1;
        })
        .map(entry => (
          <div style={{ margin: '2rem 0' }}>
            <Typography>
              <b>Date:</b> {moment(entry.date).format('MMM D, YYYY')}
            </Typography>
            <Typography>
              <b>Pain:</b>
            </Typography>
            <Typography>
              <em>— Level:</em> {formatLevel(entry.pain.level)}
            </Typography>
            <Typography>
              <em>— Details:</em> {entry.pain.details}
            </Typography>
            <Typography>
              <b>Diet:</b>
            </Typography>
            <Typography>
              <em>— Type:</em> {entry.food.diet.type}
            </Typography>
            <Typography>
              <em>— Notes:</em> {entry.food.diet.notes}
            </Typography>
            <Typography>
              <b>Meals:</b>
            </Typography>
            {entry.food.meals.map((meal, index) => (
              <>
                <Typography>— {formatMealType(meal.type)}</Typography>
                <Typography>
                  <em>—— Time:</em> {moment(meal.time).format('h:mm A')}
                </Typography>
                <Typography>
                  <em>—— Meal Items:</em>
                </Typography>
                {meal.items.map((item, index) => (
                  <>
                    <Typography>
                      ——— <b>{index + 1}.</b> {item.name}
                    </Typography>
                    <>
                      <Typography>
                        <em>———— Portion:</em> {item.portion}
                      </Typography>
                      <Typography>
                        <em>———— Ingredients:</em> {item.ingredients}
                      </Typography>
                      <Typography>
                        <em>———— Notes:</em> {item.notes}
                      </Typography>
                    </>
                  </>
                ))}
                <Typography>
                  <em>—— Notes:</em> {meal.notes}
                </Typography>
              </>
            ))}
            <Typography>
              <b>Sleep:</b>
            </Typography>
            <Typography>
              <em>— Amount:</em> {formatSleepAmount(entry.sleep.amount)}
            </Typography>
            <Typography>
              <em>— Rating:</em> {entry.sleep.rating}
            </Typography>
            <Typography>
              <em>— Notes:</em> {entry.sleep.notes}
            </Typography>
            <Typography>
              <b>Stress:</b>
            </Typography>
            <Typography>
              <em>— Level:</em> {formatLevel(entry.stress.level)}
            </Typography>
            <Typography>
              <em>— Notes:</em> {entry.stress.notes}
            </Typography>
            <Typography>
              <b>Stomach:</b>
            </Typography>
            <Typography>
              <em>— Rating:</em> {entry.stomach.rating}
            </Typography>
            <Typography>
              <em>— Notes:</em> {entry.stomach.notes}
            </Typography>
            <Typography>
              <b>Movement:</b>
            </Typography>
            {entry.movement.map(movement => (
              <>
                <Typography>
                  <em>— Type:</em> {movement.type}
                </Typography>
                <Typography>
                  <em>— Notes:</em> {movement.notes}
                </Typography>
              </>
            ))}
            <Typography>
              <b>Appointments:</b>
            </Typography>
            {entry.appointments.map(appointment => (
              <>
                <Typography>
                  <em>— Type:</em> {appointment.type}
                </Typography>
                <Typography>
                  <em>— Practitioner:</em> {appointment.practitioner}
                </Typography>
                <Typography>
                  <em>— Notes:</em> {appointment.notes}
                </Typography>
              </>
            ))}
            <Typography>
              <b>Mood:</b> {entry.mood.map(mood => mood).join(', ')}
            </Typography>
            <Typography>
              <b>Supplements:</b>{' '}
              {entry.supplements.map(supplement => supplement).join(', ')}
            </Typography>

            <Typography>
              <b>Location: {entry.travel.location}</b>
            </Typography>

            <Typography>
              <b>Overall Notes:</b> {entry.notes}
            </Typography>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  journal: state.user.journal,
  user: state.user.profile
});

export default connect(mapStateToProps)(Printout);
