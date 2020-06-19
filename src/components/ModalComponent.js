import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core';

const styles = theme => ({
  dialogRoot: {
    maxWidth: '100%',
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 'max-content',
      display: 'flex'
    }
  },
  root: {
    display: 'flex',
    margin: 0,
    padding: theme.spacing(2),
    alignContent: 'space-around',
    alignItems: 'center'
  },
  titleText: {
    flexGrow: '1'
  },
  closeButton: {
    marginLeft: 20
  }
});

export const DialogTitleComponent = withStyles(styles)(({ children, classes, onClose, disabled = false }) => {
  return (
    <DialogTitle disableTypography className={classes.root}>
      <Typography variant="h6" className={classes.titleText}>
        {children}
      </Typography>
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} disabled={disabled}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
});

const ModalComponent = withStyles(styles)(({ children, visible, fullScreen = false, classes }) => {
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));
  return (
    <Dialog
      className={classes.dialogRoot}
      open={visible}
      scroll="paper"
      fullScreen={match && fullScreen}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {children}
    </Dialog>
  );
});

export default ModalComponent;
