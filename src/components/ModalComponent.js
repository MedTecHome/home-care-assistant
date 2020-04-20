import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    maxWidth: 400,
    margin: 'auto',
    top: 15,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 4, 3),
  },
}));

function ModalComponent({ children, handleModalClose, visible }) {
  const classes = useStyles();

  return (
    <Modal open={visible} onClose={handleModalClose}>
      <div className={classes.modal}>{children}</div>
    </Modal>
  );
}

export default ModalComponent;
