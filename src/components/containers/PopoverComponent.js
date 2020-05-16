import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
    maxWidth: 230,
    textAlign: 'justify'
  },
  paper: {
    padding: theme.spacing(1)
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& *': {
      fontSize: '0.834rem'
    }
  }
}));

function PopoverComponent({ open, anchorEl, onClose, title }) {
  const classes = useStyles();
  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      onClose={onClose}
      disableRestoreFocus
    >
      <Typography component="div" className={classes.title}>
        {title}
      </Typography>
    </Popover>
  );
}

export default PopoverComponent;
