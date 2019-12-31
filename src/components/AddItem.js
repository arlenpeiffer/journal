import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';

import ButtonPrimary from './ButtonPrimary';

const useStyles = makeStyles(theme => ({
  inputInner: {
    paddingTop: '9px',
    paddingBottom: '9px'
  },
  inputOuter: {
    marginRight: theme.spacing(1)
  },
  label: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'inline-flex',
    '& > :first-child': {
      marginRight: theme.spacing(0.5)
    }
  },
  row: {
    alignItems: 'center',
    display: 'flex'
  },
  wrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const AddItem = ({ callback, dataSource, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  const classes = useStyles();

  const icon = isOpen ? 'expand_more' : 'add';

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    callback(value);
    setValue('');
  };

  const toggleExpanded = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes.wrapper}>
      <span className={classes.label} onClick={toggleExpanded}>
        <Icon fontSize="small">{icon}</Icon>
        <Typography variant="button">Add new</Typography>
      </span>
      <Collapse in={isOpen} timeout={150}>
        <div className={classes.row}>
          <OutlinedInput
            classes={{ input: classes.inputInner }}
            className={classes.inputOuter}
            onChange={handleChange}
            value={value}
            variant="outlined"
          />
          <ButtonPrimary onClick={handleClick}>Add</ButtonPrimary>
        </div>
      </Collapse>
    </div>
  );
};

export default AddItem;
