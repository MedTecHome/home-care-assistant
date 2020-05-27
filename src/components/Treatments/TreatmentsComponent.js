import React, { useEffect, useState } from 'react';
import uuid from 'uuid4';
import { useMediaQuery, Typography } from '@material-ui/core';
import { useTreatmentsContext, withTreatmentsContext } from './TreatmentsContext';
import TableComponent from '../table/TableComponent';
import treatmentsHeadCells from './treatmentsHeadCells';
import ModalComponent from '../ModalComponent';
import TreatmentsFormComponent from './forms/TreatmentsFormComponent';
import RowListTreatmentsComponent from './RowListTreatmentsComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCustomPaginationContext, withCustomPaginationContext } from '../pagination/PaginationContext';
import PaginationComponent from '../pagination/PaginationComponent';
import FiltersTreatmentComponent from './FiltersTreatmentComponent';
import { getPropValue } from '../../helpers/utils';

function TreatmentsComponent({ patient }) {
  const { pageSize, offset } = useCustomPaginationContext();
  const {
    listTreatments,
    total,
    modalVisible,
    setParams,
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

  useEffect(() => {
    if (getPropValue(patient, 'id')) {
      setParams({ 'user.id': getPropValue(patient, 'id'), limit: pageSize, offset });
    }
  }, [patient, setParams, pageSize, offset]);

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
        filters={<FiltersTreatmentComponent />}
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
      <PaginationComponent
        total={total}
        first={getPropValue(listTreatments[0], 'name')}
        last={getPropValue(listTreatments[listTreatments.length - 1], 'name')}
      />
    </>
  );
}

export default withCustomPaginationContext(withTreatmentsContext(TreatmentsComponent));
