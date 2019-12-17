import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  actionIcon: {
    color: 'white',
    marginLeft: theme.spacing(3)
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.light
  },
  messageIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1.5)
  },
  root: {
    display: 'inline-block',
    marginBottom: theme.spacing(2),
    paddingBottom: 0,
    paddingTop: 0
  },
  warning: {
    backgroundColor: theme.palette.warning.main
  }
}));

const Alert = ({ action, actionIcon, message, variant }) => {
  const classes = useStyles();

  const Content = (
    <div className={classes.content}>
      <Icon className={classes.messageIcon}>{variant}</Icon>
      {message}
      <IconButton
        className={classes.actionIcon}
        disabled={!action}
        onClick={action}
      >
        <Icon>{actionIcon || 'close'}</Icon>
      </IconButton>
    </div>
  );

  return (
    <SnackbarContent
      className={`${classes.root} ${classes[variant]}`}
      message={Content}
    />
  );
};

export default Alert;

Alert.propTypes = {
  action: PropTypes.func,
  actionIcon: PropTypes.string,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'info', 'warning']).isRequired
};
