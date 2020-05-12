import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import { usePatientHistoryContext, withPatientHistoryContext } from './PatientHistoryContext';
import ListPatientHistoryComponent from './ListPatientHistoryComponent';
import FiltersPatientHistoryComponent from './FiltersPatientHistoryComponent';
import ModalComponent from '../../ModalComponent';
import DetailHistoryMedicalFormComponent from './DetailHistoryMedicalFormComponent';
import { useAuthContext } from '../../../contexts/AuthContext';
import useCustomStyles from '../../../jss/globalStyles';

function PatientHistoryComponent() {
  const { state } = useLocation();
  const { getPatientHistory, historyList, loadingList, modalVisible, filters, setFilters } = usePatientHistoryContext();
  const [page, setPage] = useState({});
  const [currentPatient, setCurrentPatient] = useState(null);
  const { currentUserProfile } = useAuthContext();
  const classes = useCustomStyles();

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

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <DetailHistoryMedicalFormComponent />
      </ModalComponent>
      <Grid container>
        <Grid item xs={5}>
          <FiltersPatientHistoryComponent />
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
        </Grid>
      </Grid>
    </>
  );
}

export default withPatientHistoryContext(PatientHistoryComponent);
