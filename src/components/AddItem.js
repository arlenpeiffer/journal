import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';

import ButtonPrimary from './ButtonPrimary';
import { checkIfLogContainsValue } from '../utils';

const useStyles = makeStyles(theme => ({
  button: {
    margin: 0
  },
  errorText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  formControl: {
    maxWidth: '100%'
  },
  inputInner: {
    paddingTop: '8.5px',
    paddingBottom: '8.5px'
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

const AddItem = ({ callback, log, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();

  const icon = isExpanded ? 'expand_more' : 'add';

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    const formattedValue = value.trim();
    const logContainsValue = checkIfLogContainsValue(log, formattedValue);
    const valueIsEmptyString = formattedValue === '';

    const handleLogContainsValue = () => {
      setError(`${value} is already on the list.`);
      setValue('');
    };

    const handleValueIsEmptyString = () => {
      setError(`Please enter a value.`);
      setValue('');
    };

    const handleSubmit = () => {
      callback(formattedValue);
      setError('');
      setValue('');
    };

    if (valueIsEmptyString) {
      return handleValueIsEmptyString();
    } else if (logContainsValue) {
      return handleLogContainsValue();
    } else {
      return handleSubmit();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={classes.wrapper}>
      <span className={classes.label} onClick={toggleExpanded}>
        <Icon fontSize="small">{icon}</Icon>
        <Typography variant="button">Add new</Typography>
      </span>
      <Collapse in={isExpanded} timeout={150}>
        <FormControl className={classes.formControl} error={!!error}>
          <div className={classes.row}>
            <OutlinedInput
              classes={{ input: classes.inputInner }}
              className={classes.inputOuter}
              onChange={handleChange}
              value={value}
              variant="outlined"
            />
            <ButtonPrimary className={classes.button} onClick={handleClick}>
              Add
            </ButtonPrimary>
          </div>
          {error && (
            <FormHelperText className={classes.errorText}>
              {error}
            </FormHelperText>
          )}
        </FormControl>
      </Collapse>
    </div>
  );
};

export default AddItem;
