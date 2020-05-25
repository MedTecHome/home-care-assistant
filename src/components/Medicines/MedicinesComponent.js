import React, { useCallback, useEffect } from 'react';
import uuid from 'uuid4';
import { useMediaQuery, Typography } from '@material-ui/core';
import { useMedicinesContext, withMedicinesContext } from './MedicinesContext';
import ModalComponent from '../ModalComponent';
import medicineHeadCells from './medicineHeadCells';
import FormsMedicineComponent from './forms/FormsMedicineComponent';
import FiltersMedicineComponent from './FiltersMedicineComponent';
import RowListMedicineComponent from './RowListMedicineComponent';
import TableComponent from '../table/TableComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { withCustomPaginationContext, useCustomPaginationContext } from '../pagination/PaginationContext';
import PaginationComponent from '../pagination/PaginationComponent';

function MedicinesComponent() {
  const { pageSize, offset } = useCustomPaginationContext();
  const { currentUserProfile } = useAuthContext();
  const {
    getMedicinesList,
    medicineList,
    loadingList,
    selectMedicineFromList,
    selected,
    modalVisible,
    setModalVisible,
    formType,
    total
  } = useMedicinesContext();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const cells = match ? [medicineHeadCells[0]] : medicineHeadCells;

  const handleReloadList = useCallback(() => {
    getMedicinesList({ limit: pageSize, offset });
  }, [getMedicinesList, pageSize, offset]);

  useEffect(() => {
    if (formType === null) handleReloadList();
  }, [formType, handleReloadList]);

  const handleModalVisible = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <FormsMedicineComponent formType={formType} />
      </ModalComponent>
      <TableComponent
        title="Listado de medicamentos"
        extraText={
          <Typography>
            <strong>Total: </strong>({total})
          </Typography>
        }
        filters={<FiltersMedicineComponent currentUserProfile={currentUserProfile} />}
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
      <PaginationComponent total={total} />
    </>
  );
}

export default withMedicinesContext(withCustomPaginationContext(MedicinesComponent));
