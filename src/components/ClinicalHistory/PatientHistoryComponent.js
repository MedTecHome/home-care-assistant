import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import { usePatientHistoryContext } from './PatientHistoryContext';
import ListPatientHistoryComponent from './ListPatientHistoryComponent';
import FiltersPatientHistoryComponent from './FiltersPatientHistoryComponent';
import ModalComponent from '../ModalComponent';
import DetailHistoryMedicalFormComponent from './DetailHistoryMedicalFormComponent';
import useCustomStyles from '../../jss/globalStyles';
import FilterPatientHistoryGraficsComponent from './FilterPatientHistoryGraficsComponent';

function PatientHistoryComponent() {
  const { getPatientHistory, historyList, loadingList, modalVisible, filters, setFilters } = usePatientHistoryContext();
  const [page, setPage] = useState({});
  const classes = useCustomStyles();

  useEffect(() => {
    // console.log(filters);
    getPatientHistory({ filters, ...page });
  }, [setFilters, getPatientHistory, filters, page]);

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <DetailHistoryMedicalFormComponent />
      </ModalComponent>
      <Grid container>
        <Grid item xs={12} sm={5}>
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
        <Grid item xs={12} sm={7} container>
          <FilterPatientHistoryGraficsComponent />
        </Grid>
      </Grid>
    </>
  );
}

export default PatientHistoryComponent;
