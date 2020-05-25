import React, { useCallback, useEffect, useState } from 'react';
import uuid from 'uuid4';
import { useMediaQuery, Typography } from '@material-ui/core';
import { useTreatmentsContext } from './TreatmentsContext';
import TableComponent from '../table/TableComponent';
import treatmentsHeadCells from './treatmentsHeadCells';
import ModalComponent from '../ModalComponent';
import TreatmentsFormComponent from './forms/TreatmentsFormComponent';
import RowListTreatmentsComponent from './RowListTreatmentsComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCustomPaginationContext, withCustomPaginationContext } from '../pagination/PaginationContext';
import PaginationComponent from '../pagination/PaginationComponent';

function TreatmentsComponent() {
  const { pageSize, offset } = useCustomPaginationContext();
  const {
    listTreatments,
    total,
    modalVisible,
    getListOfTreatments,
    loadingList,
    selected,
    setModalVisible,
    formType,
    selectFromList
  } = useTreatmentsContext();
  const { isDoctor } = useAuthContext();
  const [open, setOpen] = useState(null);
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const cells = match ? [treatmentsHeadCells[0]] : treatmentsHeadCells;

  const handleLoadList = useCallback(() => {
    getListOfTreatments({ limit: pageSize, offset });
  }, [getListOfTreatments, pageSize, offset]);

  useEffect(() => {
    if (formType === null) handleLoadList();
  }, [formType, handleLoadList]);

  const handleModalVisible = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} width={0}>
        <TreatmentsFormComponent formType={formType} />
      </ModalComponent>
      <TableComponent
        extraText={
          <Typography>
            <strong>Total: </strong>({total})
          </Typography>
        }
        addRole={isDoctor}
        disableElevation
        headCells={cells}
        loadingList={loadingList}
        list={listTreatments}
        setModalVisible={setModalVisible}
        selected={selected}
        render={(row, index) => (
          <RowListTreatmentsComponent
            cells={cells}
            key={uuid()}
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
      <PaginationComponent total={total} />
    </>
  );
}

export default withCustomPaginationContext(TreatmentsComponent);
