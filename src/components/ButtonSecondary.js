import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 0,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.dark
    }
  },
  text: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5)
  }
}));

const ButtonPrimary = props => {
  const classes = useStyles();

  return (
    <Button
      className={`${classes.root} ${classes.text}`}
      color="primary"
      // disableRipple
      {...props}
    />
  );
};

export default ButtonPrimary;
