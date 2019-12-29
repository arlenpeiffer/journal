import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}));

const ButtonPrimary = props => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      color="primary"
      variant="contained"
      {...props}
    />
  );
};

export default ButtonPrimary;
