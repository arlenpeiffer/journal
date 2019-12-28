import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Typgoraphy from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';

import ButtonSecondary from './ButtonSecondary';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2)
  },
  popper: {
    maxWidth: '225px'
  }
}));

const Popup = ({ button, children, onConfirm, text, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  const modifiers = {
    arrow: {
      enabled: true
      // element: arrowRef
    },
    flip: {
      enabled: true
    },
    preventOverflow: {
      enabled: true,
      boundariesElement: 'scrollParent'
    }
  };

  const handleClose = event => {
    event.stopPropagation();
    setIsOpen(false);
  };

  const handleOpen = event => {
    event.stopPropagation();
    if (!isOpen) {
      setAnchorEl(event.currentTarget.querySelector('button'));
      setIsOpen(true);
    }
  };

  const defaultPopupContent = (
    <>
      <Typgoraphy>{text}</Typgoraphy>
      <span className={classes.buttons}>
        <ButtonSecondary onClick={onConfirm}>Yes</ButtonSecondary>
        <ButtonSecondary onClick={handleClose}>No</ButtonSecondary>
      </span>
    </>
  );

  return (
    <div onClick={handleOpen}>
      <Popper
        anchorEl={anchorEl}
        className={classes.popper}
        modifiers={modifiers}
        open={isOpen}
        transition
        {...props}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Zoom {...TransitionProps} timeout={300}>
              <Paper className={classes.paper}>
                {children || defaultPopupContent}
              </Paper>
            </Zoom>
          </ClickAwayListener>
        )}
      </Popper>

      {button}
    </div>
  );
};

export default Popup;

Popup.propTypes = {
  button: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
    .isRequired,
  onConfirm: PropTypes.func.isRequired, // require only if !children
  text: PropTypes.string.isRequired // require only if !children
};
