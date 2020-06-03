import React, { useEffect } from 'react';
import uuid from 'uuid4';
import { useMediaQuery, Typography } from '@material-ui/core';
import { useMedicinesContext, withMedicinesContext } from './MedicinesContext';
import ModalComponent from '../ModalComponent';
import medicineHeadCells from './medicineHeadCells';
import FiltersMedicineComponent from './FiltersMedicineComponent';
import RowListMedicineComponent from './RowListMedicineComponent';
import TableComponent from '../table/TableComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { withCustomPaginationContext } from '../pagination/PaginationContext';
import PaginationComponent from '../pagination/PaginationComponent';
import { getPropValue } from '../../helpers/utils';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, DELETE_FORM_TEXT, DETAILS_FORM_TEXT } from '../../commons/globalText';
import AddOrEditMedicineComponent from './forms/AddOrEditMedicineComponent';
import DeleteMedicineComponent from './forms/DeleteMedicineComponent';
import DetailsMedicineComponent from './forms/DetailsMedicineComponent';

function MedicinesComponent() {
  const { currentUserProfile } = useAuthContext();
  const {
    medicineList,
    loadingList,
    selectMedicineFromList,
    selected,
    modalVisible,
    setModalVisible,
    saveMedicineValues,
    formType,
    setParams,
    params,
    total,
    resetPagination
  } = useMedicinesContext();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const cells = match ? [medicineHeadCells[0]] : medicineHeadCells;

  useEffect(() => {
    resetPagination();
  }, [params, resetPagination]);
  useEffect(() => {
    setParams({ clinic: getPropValue(currentUserProfile, 'parent') });
  }, [currentUserProfile, setParams]);

  const handleModalVisible = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        {([ADD_FORM_TEXT, EDIT_FORM_TEXT].includes(formType) && (
          <AddOrEditMedicineComponent
            title={`${
              (formType === ADD_FORM_TEXT && 'Adicionar') || (formType === EDIT_FORM_TEXT && 'Editar')
            } medicamento`}
            setModalVisible={setModalVisible}
            selected={selected}
            formType={formType}
            saveMedicineValues={saveMedicineValues}
            clinic={currentUserProfile.parent}
          />
        )) ||
          (formType === DELETE_FORM_TEXT && (
            <DeleteMedicineComponent
              selected={selected}
              formType={formType}
              saveMedicineValues={saveMedicineValues}
              setModalVisible={setModalVisible}
            />
          )) ||
          (formType === DETAILS_FORM_TEXT && (
            <DetailsMedicineComponent setModalVisible={setModalVisible} selected={selected} />
          )) ||
          null}
      </ModalComponent>
      <TableComponent
        title="Listado de medicamentos"
        extraText={
          <Typography>
            <strong>Total: </strong>({total})
          </Typography>
        }
        filters={
          <FiltersMedicineComponent setParams={setParams} params={params} currentUserProfile={currentUserProfile} />
        }
        headCells={cells}
        list={medicineList}
        loadingList={loadingList}
        setModalVisible={setModalVisible}
        selected={selected}
        addRole
        render={(row, index) => (
          <RowListMedicineComponent
            key={uuid()}
            cells={cells}
            row={row}
            index={index}
            selectRow={selectMedicineFromList}
            selected={selected}
            onModalVisible={handleModalVisible}
          />
        )}
      />
      <PaginationComponent
        total={total}
        first={getPropValue(medicineList[0], 'name')}
        last={getPropValue(medicineList[medicineList.length - 1], 'name')}
      />
    </>
  );
}

export default withCustomPaginationContext(withMedicinesContext(MedicinesComponent));
