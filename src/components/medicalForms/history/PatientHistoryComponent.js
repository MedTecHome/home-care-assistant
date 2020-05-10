import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { usePatientHistoryContext, withPatientHistoryContext } from './PatientHistoryContext';
import ListPatientHistoryComponent from './ListPatientHistoryComponent';
import FiltersPatientHistoryComponent from './FiltersPatientHistoryComponent';
import ModalComponent from '../../ModalComponent';
import DetailHistoryMedicalFormComponent from './DetailHistoryMedicalFormComponent';
import { useAuthContext } from '../../../contexts/AuthContext';

const useStyles = makeStyles({
  extraText: {
    width: '100%',
    display: 'flex',
    color: '#666666',
    '& > *': {
      fontSize: '0.842rem',
      marginRight: 60
    }
  }
});

function PatientHistoryComponent() {
  const { state } = useLocation();
  const {
    getPatientHistory,
    historyList,
    loadingList,
    modalVisible,
    setModalVisible,
    filters,
    setFilters
  } = usePatientHistoryContext();
  const [page, setPage] = useState({});
  const [currentPatient, setCurrentPatient] = useState(null);
  const { currentUserProfile } = useAuthContext();
  const classes = useStyles();

  useEffect(() => {
    if (state) {
      if (state.profile) {
        setFilters({ 'user.id': state.profile.id });
        setCurrentPatient(state.profile);
      }
    }
  }, [state, setFilters]);

  useEffect(() => {
    if (currentUserProfile) {
      if (currentUserProfile.role.id === 'patient') {
        setCurrentPatient(currentUserProfile);
      }
    }
  }, [currentUserProfile]);

  useEffect(() => {
    getPatientHistory({ filters, ...page });
  }, [setFilters, getPatientHistory, filters, page]);

  const handleClose = () => {
    setModalVisible(false, null);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} onBackdropClick={handleClose}>
        <DetailHistoryMedicalFormComponent />
      </ModalComponent>
      <Container maxWidth="md">
        <FiltersPatientHistoryComponent />
        <div className={classes.extraText}>
          <Typography>
            Nombre: <strong>{currentPatient && currentPatient.fullname}</strong>
          </Typography>
        </div>
        <ListPatientHistoryComponent />
        <div className={classes.pagination}>
          {!loadingList && (
            <>
              <IconButton onClick={() => setPage({ prev: historyList[0] })}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setPage({ next: historyList[historyList.length - 1] })}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </div>
      </Container>
    </>
  );
}

export default withPatientHistoryContext(PatientHistoryComponent);
