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
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(0.75),
    marginBottom: theme.spacing(-0.75)
  },
  paper: {
    backgroundColor: theme.palette.warning.light,
    padding: theme.spacing(2)
  },
  popper: {
    maxWidth: '225px',
    zIndex: 1,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-1em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.warning.light} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-1em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.warning.light} transparent transparent transparent`
      }
    }
  }
}));

const Popup = ({ button, children, onConfirm, text, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [arrowRef, setArrowRef] = useState(null);

  const classes = useStyles();

  const modifiers = {
    arrow: {
      enabled: true,
      element: arrowRef
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
        placement="top"
        transition
        {...props}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Zoom {...TransitionProps} timeout={300}>
              <Paper className={classes.paper} elevation={0}>
                <span className={classes.arrow} ref={setArrowRef} />
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
