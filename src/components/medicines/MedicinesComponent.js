import React, { useCallback, useEffect } from 'react';
import uuid from 'uuid4';
import { useMedicinesContext, withMedicinesContext } from './MedicinesContext';
import ModalComponent from '../ModalComponent';
import medicineHeadCells from './medicineHeadCells';
import FormsMedicineComponent from './forms/FormsMedicineComponent';
import FiltersMedicineComponent from './FiltersMedicineComponent';
import RowListMedicineComponent from './RowListMedicineComponent';
import TableComponent from '../table/TableComponent';
import { useAuthContext } from '../../contexts/AuthContext';

function MedicinesComponent() {
  const {
    getMedicinesList,
    medicineList,
    loadingList,
    selectMedicineFromList,
    selected,
    modalVisible,
    setModalVisible,
    formType,
    filters
  } = useMedicinesContext();
  const { currentUserProfile } = useAuthContext();

  const handleReloadList = useCallback(() => {
    getMedicinesList({ filters });
  }, [getMedicinesList, filters]);

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
        filters={<FiltersMedicineComponent />}
        headCells={medicineHeadCells}
        list={medicineList}
        loadingList={loadingList}
        setModalVisible={setModalVisible}
        selected={selected}
        addRole={currentUserProfile && currentUserProfile.role.id === 'doctor'}
        render={(row, index) => (
          <RowListMedicineComponent
            key={uuid()}
            row={row}
            index={index}
            selectRow={selectMedicineFromList}
            selected={selected}
            onModalVisible={handleModalVisible}
          />
        )}
      />
    </>
  );
}

export default withMedicinesContext(MedicinesComponent);
