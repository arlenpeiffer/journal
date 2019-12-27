import React, { useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Typgoraphy from '@material-ui/core/Typography';

import ButtonSecondary from './ButtonSecondary';

const Popup = ({ button, children, onNo, onYes, text, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [arrowRef, setArrowRef] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = event => {
    event.stopPropagation();

    if (!isOpen) {
      setAnchorEl(event.currentTarget);
      setIsOpen(!isOpen);
    }
  };

  const handleClickAway = event => {
    event.stopPropagation();
    setIsOpen(false);
  };

  return (
    <>
      <Popper
        anchorEl={anchorEl}
        open={isOpen}
        modifiers={{
          flip: {
            enabled: true
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent'
          },
          arrow: {
            enabled: true
            // element: arrowRef
          }
        }}
        {...props}
      >
        <Paper>
          <Typgoraphy>{text}</Typgoraphy>
          <ButtonSecondary onClick={onYes}>Yes</ButtonSecondary>
          <ButtonSecondary onClick={onNo}>No</ButtonSecondary>
        </Paper>
      </Popper>
      {/* <ClickAwayListener onClickAway={handleClickAway}> */}
      <span onClick={handleClick}>{button}</span>
      {/* </ClickAwayListener> */}
    </>
  );
};

export default Popup;
