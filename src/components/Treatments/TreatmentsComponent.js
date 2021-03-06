import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { useTreatmentsContext, withTreatmentsContext } from './TreatmentsContext';
import TableComponent from '../table/TableComponent';
import treatmentsHeadCells from './treatmentsHeadCells';
import ModalComponent from '../ModalComponent';
import RowListTreatmentsComponent from './RowListTreatmentsComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { withCustomPaginationContext } from '../pagination/PaginationContext';
import { getPropValue } from '../../helpers/utils';
import AddOrEditFormComponent from './forms/AddOrEditFormComponent';
import DeleteTreatmentComponent from './forms/DeleteTreatmentComponent';
import DetailsTreatmentComponent from './forms/DetailsTreatmentComponent';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, DELETE_FORM_TEXT, DETAILS_FORM_TEXT } from '../../commons/globalText';
import TitlePagesComponent from '../text/TitlePagesComponent';

function TreatmentsComponent({ patient, fromDoctor }) {
  const {
    list,
    total,
    modalVisible,
    setUserFilter,
    userFilter,
    saveValues,
    loadingList,
    selected,
    setModalVisible,
    formType,
    selectFromList
  } = useTreatmentsContext();
  const { isDoctor, currentUserProfile } = useAuthContext();
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (getPropValue(patient, 'id')) {
      setUserFilter(getPropValue(patient, 'id'));
    }
  }, [patient, setUserFilter]);

  const handleModalVisible = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} width={0}>
        {[ADD_FORM_TEXT, EDIT_FORM_TEXT].includes(formType) && (
          <AddOrEditFormComponent
            selected={selected}
            userFilter={userFilter}
            setModalVisible={setModalVisible}
            saveValues={saveValues}
            formType={formType}
            clinic={currentUserProfile.parent}
            doctor={currentUserProfile.id}
            title={`${formType} tratamiento`}
          />
        )}
        {formType === DELETE_FORM_TEXT && <DeleteTreatmentComponent />}
        {formType === DETAILS_FORM_TEXT && <DetailsTreatmentComponent />}
      </ModalComponent>
      <TableComponent
        title={!fromDoctor ? <TitlePagesComponent text="Lista de tratamientos" /> : null}
        extraText={
          <Typography>
            <strong>Total: </strong>({total})
          </Typography>
        }
        addRole={isDoctor}
        disableElevation
        headCells={treatmentsHeadCells}
        loadingList={loadingList}
        list={list}
        total={total}
        setModalVisible={setModalVisible}
        selected={selected}
        render={(row, index) => (
          <RowListTreatmentsComponent
            key={row.id}
            open={open}
            setOpen={setOpen}
            row={row}
            index={index}
            selected={selected}
            selectRow={selectFromList}
            onModalVisible={handleModalVisible}
            editRole={isDoctor}
            delRole={isDoctor}
          />
        )}
      />
    </>
  );
}

export default withCustomPaginationContext(withTreatmentsContext(TreatmentsComponent));
