import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

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
  },
  content: {
    textDecoration: 'underline'
  }
}));

function PopoverComponent({ className, title }) {
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
        className={clsx(className, classes.content)}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {title}
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
        <Typography component="div" className={classes.title}>
          {title}
        </Typography>
      </Popover>
    </div>
  );
}

export default PopoverComponent;
