import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import uuid from 'uuid4';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useMedicinesContext, withMedicinesContext } from './MedicinesContext';
import ModalComponent from '../ModalComponent';
import ListMedicinesComponent from './ListMedicinesComponent';
import medicineHeadCells from './medicineHeadCells';
import { DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import FormsMedicineComponent from './forms/FormsMedicineComponent';
import FiltersMedicineComponent from './FiltersMedicineComponent';
import RowListMedicineComponent from './RowListMedicineComponent';

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
  } = useMedicinesContext();
  const { search } = useLocation();

  const handleReloadList = useCallback(() => {
    let filters = {};
    const urlSearchParams = new URLSearchParams(search);
    if (urlSearchParams.has('nM')) {
      filters = { ...filters, name: urlSearchParams.get('nM') };
    }
    getMedicinesList({ filters });
  }, [getMedicinesList, search]);

  useEffect(() => {
    handleReloadList();
  }, [handleReloadList]);

  const handleBackdrop = () => {
    setModalVisible(false, null);
  };

  const handleDetailtSelected = () => {
    setModalVisible(true, DETAILS_FORM_TEXT);
  };

  const handleEditSelected = () => {
    setModalVisible(true, EDIT_FORM_TEXT);
  };

  const handleDeleteSelected = () => {
    setModalVisible(true, DELETE_FORM_TEXT);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} onBackdropClick={handleBackdrop}>
        <FormsMedicineComponent formType={formType} onFormsClose={handleReloadList} />
      </ModalComponent>
      <Card elevation={1}>
        <CardHeader title="Listado de medicamentos" />
        <CardContent>
          <ListMedicinesComponent
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
                onClickDetail={handleDetailtSelected}
                onClickEdit={handleEditSelected}
                onClickDelete={handleDeleteSelected}
              />
            )}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default withMedicinesContext(MedicinesComponent);
