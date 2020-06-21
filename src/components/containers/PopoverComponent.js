import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { DialogTitle, DialogContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
    width: '100%',
    maxWidth: 400
  },
  paper: {
    padding: theme.spacing(1)
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '& span': {
      fontSize: '0.834rem',
      fontWeight: 600,
      textDecoration: 'underline'
    }
  },
  content: {
    minWidth: 200,
    borderBottom: 'none'
  },
  titleDialog: {
    padding: 3
  }
}));

function PopoverComponent({ className, header, label, title, content }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        component="div"
        className={clsx(className, classes.title)}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {label ? `${label}: ` : null}
        <span>{title}</span>
      </Typography>
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
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <DialogTitle className={classes.titleDialog}>{header || 'Información'} </DialogTitle>
        <DialogContent dividers className={classes.content}>
          {content}
        </DialogContent>
      </Popover>
    </div>
  );
}

export default PopoverComponent;
