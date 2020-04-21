import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { usePatientsContext } from '../../../contexts/PatientsContext';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    width: '100%',
  },
  header: {
    color: '#666',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

function DelPatiensComponent() {
  const { patientSelected, formType, savePatientsData, setModalVisible } = usePatientsContext();
  const classes = useStyles();

  const handleSaveData = () => {
    savePatientsData(patientSelected, formType);
    setModalVisible(false, null);
  };

  const handleCancelForm = () => {
    setModalVisible(false, null);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h5>Esta seguro que desea eliminar el paciente.</h5>
      </div>
      <Container className={classes.actionButtons}>
        <Button variant="contained" onClick={handleCancelForm}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSaveData}>
          Eliminar
        </Button>
      </Container>
    </div>
  );
}

export default DelPatiensComponent;
