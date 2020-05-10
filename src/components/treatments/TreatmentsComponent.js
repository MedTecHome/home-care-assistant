import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import uuid from 'uuid4';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListItem from '@material-ui/core/ListItem';
import { useTreatmentsContext, withTreatmentsContext } from './TreatmentsContext';
import TableComponent from '../table/TableComponent';
import treatmentsHeadCells from './treatmentsHeadCells';
import ModalComponent from '../ModalComponent';
import TreatmentsFormComponent from './forms/TreatmentsFormComponent';
import RowListTreatmentsComponent from './RowListTreatmentsComponent';
import FiltersTratmentComponent from './FiltersTreatmentComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import useCustomStyles from '../../jss/globalStyles';

function TreatmentsComponent() {
  const {
    listTreatments,
    modalVisible,
    getListOfTreatments,
    loadingList,
    selected,
    setModalVisible,
    formType,
    selectFromList,
    setFilters,
    filters
  } = useTreatmentsContext();
  const [page, setPage] = useState({});
  const [currentPatient, setCurrentPatient] = useState(null);
  const { currentUserProfile } = useAuthContext();
  const { state } = useLocation();
  const classes = useCustomStyles();

  useEffect(() => {
    if (state) {
      if (state.formType) setModalVisible(true, state.formType);
      if (state.profile) {
        setFilters({ 'patient.id': state.profile.id });
        setCurrentPatient(state.profile);
      }
    }
  }, [state, setModalVisible, setFilters]);

  useEffect(() => {
    if (currentUserProfile)
      if (currentUserProfile.role.id === 'patient') {
        setFilters({ 'patient.id': currentUserProfile.id });
        setCurrentPatient(currentUserProfile);
      }
  }, [currentUserProfile, setFilters]);

  const handleLoadList = useCallback(() => {
    getListOfTreatments({ filters, ...page });
  }, [getListOfTreatments, filters, page]);

  useEffect(() => {
    handleLoadList();
  }, [handleLoadList]);

  const handleModalVisible = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <TreatmentsFormComponent formType={formType} onCloseForms={handleLoadList} />
      </ModalComponent>
      <TableComponent
        addRole={currentUserProfile && currentUserProfile.role.id === 'doctor'}
        filters={<FiltersTratmentComponent />}
        headCells={treatmentsHeadCells}
        loadingList={loadingList}
        list={listTreatments}
        setModalVisible={setModalVisible}
        selected={selected}
        extraText={currentPatient && currentPatient.fullname}
        render={(row, index) => (
          <RowListTreatmentsComponent
            key={uuid()}
            row={row}
            index={index}
            selected={selected}
            selectRow={selectFromList}
            onModalVisible={handleModalVisible}
            editRole={currentUserProfile && currentUserProfile.role.id === 'doctor'}
            delRole={currentUserProfile && currentUserProfile.role.id === 'doctor'}
          />
        )}
      />
      <ListItem className={classes.footerList}>
        <div className={classes.pagination}>
          {!loadingList && (
            <>
              <IconButton onClick={() => setPage({ prev: listTreatments[0] })}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setPage({ next: listTreatments[listTreatments.length - 1] })}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </div>
      </ListItem>
    </>
  );
}

export default withTreatmentsContext(TreatmentsComponent);
