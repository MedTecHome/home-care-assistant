import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  dialogRoot: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 'max-content'
    }
  },
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

export const DialogTitleComponent = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <DialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
});

const ModalComponent = withStyles(styles)(({ children, visible, classes }) => {
  return (
    <Dialog
      className={classes.dialogRoot}
      open={visible}
      scroll="paper"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {children}
    </Dialog>
  );
});

export default ModalComponent;
