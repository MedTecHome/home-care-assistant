import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import ModalComponent from '../ModalComponent';
import medicineHeadCells from './medicineHeadCells';
import RowListMedicineComponent from './RowListMedicineComponent';
import TableComponent from '../table/TableComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { withCustomPaginationContext } from '../pagination/PaginationContext';
import { getPropValue } from '../../helpers/utils';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, DELETE_FORM_TEXT, DETAILS_FORM_TEXT } from '../../commons/globalText';
import AddOrEditMedicineComponent from './forms/AddOrEditMedicineComponent';
import DeleteMedicineComponent from './forms/DeleteMedicineComponent';
import DetailsMedicineComponent from './forms/DetailsMedicineComponent';
import InputSearchByTagname from '../filters/InputSearchByTagName';
import { useMedicinesContext, MedicinesContextProvider } from './MedicinesContext';
import TitlePagesComponent from '../text/TitlePagesComponent';

function SimpleMedicinesComponent() {
  const { currentUserProfile } = useAuthContext();
  const {
    list,
    loadingList,
    setSelectedFromList,
    selected,
    modalVisible,
    setModalVisible,
    saveValues,
    formType,
    setClinicFilter,
    setNameFilter,
    nameFilter,
    total
  } = useMedicinesContext();

  useEffect(() => {
    setClinicFilter(getPropValue(currentUserProfile, 'parent'));
  }, [currentUserProfile, setClinicFilter]);

  const handleModalVisible = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} fullScreen={[ADD_FORM_TEXT, EDIT_FORM_TEXT].includes(formType)}>
        {([ADD_FORM_TEXT, EDIT_FORM_TEXT].includes(formType) && (
          <AddOrEditMedicineComponent
            title={`${
              (formType === ADD_FORM_TEXT && 'Adicionar') || (formType === EDIT_FORM_TEXT && 'Editar')
            } medicamento`}
            setModalVisible={setModalVisible}
            selected={selected}
            formType={formType}
            saveMedicineValues={saveValues}
            clinic={currentUserProfile.parent}
          />
        )) ||
          (formType === DELETE_FORM_TEXT && (
            <DeleteMedicineComponent
              selected={selected}
              formType={formType}
              saveMedicineValues={saveValues}
              setModalVisible={setModalVisible}
            />
          )) ||
          (formType === DETAILS_FORM_TEXT && (
            <DetailsMedicineComponent setModalVisible={setModalVisible} selected={selected} />
          )) ||
          null}
      </ModalComponent>
      <TableComponent
        title={<TitlePagesComponent text="Lista de medicamentos" />}
        extraText={
          <Typography>
            <strong>Total: </strong>({total})
          </Typography>
        }
        filters={<InputSearchByTagname setNameFilter={setNameFilter} nameFilter={nameFilter} />}
        headCells={medicineHeadCells}
        list={list}
        total={total}
        loadingList={loadingList}
        setModalVisible={setModalVisible}
        selected={selected}
        addRole
        render={(row, index) => (
          <RowListMedicineComponent
            key={row.id}
            row={row}
            index={index}
            selectRow={setSelectedFromList}
            selected={selected}
            onModalVisible={handleModalVisible}
          />
        )}
      />
    </>
  );
}

const MedicinesComponent = withCustomPaginationContext(() => {
  return (
    <MedicinesContextProvider>
      <SimpleMedicinesComponent />
    </MedicinesContextProvider>
  );
});

export default MedicinesComponent;
