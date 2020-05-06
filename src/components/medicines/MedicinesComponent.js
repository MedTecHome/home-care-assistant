import React, { useCallback, useEffect } from 'react';
import uuid from 'uuid4';
import { useMedicinesContext, withMedicinesContext } from './MedicinesContext';
import ModalComponent from '../ModalComponent';
import medicineHeadCells from './medicineHeadCells';
import FormsMedicineComponent from './forms/FormsMedicineComponent';
import FiltersMedicineComponent from './FiltersMedicineComponent';
import RowListMedicineComponent from './RowListMedicineComponent';
import TableComponent from '../table/TableComponent';

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
    filters,
  } = useMedicinesContext();

  const handleReloadList = useCallback(() => {
    getMedicinesList({ filters });
  }, [getMedicinesList, filters]);

  useEffect(() => {
    handleReloadList();
  }, [handleReloadList]);

  const handleBackdrop = () => {
    setModalVisible(false, null);
  };

  const handleModalVisible = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} onBackdropClick={handleBackdrop}>
        <FormsMedicineComponent formType={formType} onFormsClose={handleReloadList} />
      </ModalComponent>
      <TableComponent
        title="Listado de medicamentos"
        filters={<FiltersMedicineComponent />}
        headCells={medicineHeadCells}
        list={medicineList}
        loadingList={loadingList}
        setModalVisible={setModalVisible}
        selected={selected}
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
