import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { HospitalContext } from '../../contexts/HospitalContext';

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

function ModalHospitalComponent({ children }) {
  const { hospitalModalVisible, setHospitalModalVisible } = useContext(HospitalContext);
  const classes = useStyles();

  const handleModalClose = () => {
    setHospitalModalVisible(false, null);
  };

  return (
    <Modal open={hospitalModalVisible} onClose={handleModalClose}>
      <div className={classes.modal}>{children}</div>
    </Modal>
  );
}

export default ModalHospitalComponent;
