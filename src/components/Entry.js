import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Chevron from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import Popup from './Popup';

import moment from 'moment';
import capitalize from 'lodash.capitalize';

import DataPoint from './DataPoint';
import { removeEntry } from '../redux/actions/journal';

const Entry = ({ entry, removeEntry }) => {
  const {
    appointments,
    date,
    food,
    id,
    mood,
    movement,
    notes,
    pain,
    sleep,
    stomach,
    stress,
    supplements,
    travel
  } = entry;

  const formattedDate = moment(date).format('MMM D, YYYY');

  const handleRemove = () => {
    removeEntry(id);
  };

  const SummaryContent = styled.div`
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-between;
  `;

  const RemoveButton = (
    <IconButton>
      <RemoveIcon />
    </IconButton>
  );

  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Chevron />}>
          <SummaryContent>
            <Typography>{formattedDate}</Typography>
            <ExpansionPanelActions disableSpacing>
              <Link to={`/edit/${id}`}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
              <Popup
                button={RemoveButton}
                onConfirm={handleRemove}
                text={'Are you sure you want to remove this entry?'}
              />
            </ExpansionPanelActions>
          </SummaryContent>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  removeEntry: id => dispatch(removeEntry(id))
});

export default connect(null, mapDispatchToProps)(Entry);
