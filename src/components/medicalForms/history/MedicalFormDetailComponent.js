import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { usePatientHistoryContext } from './PatientHistoryContext';
import { DialogTitleComponent } from '../../ModalComponent';

function MedicalFormDetailComponent() {
  const { selected, setModalVisible } = usePatientHistoryContext();

  const handleClose = () => {
    setModalVisible(false, null);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleClose}>Subscribe</DialogTitleComponent>
      <DialogContent dividers />
      <DialogActions />
    </>
  );
}

export default MedicalFormDetailComponent;
