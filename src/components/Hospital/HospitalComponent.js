import React, { useCallback } from 'react';
import uuid from 'uuid4';
import { useMediaQuery, Typography } from '@material-ui/core';
import { useHospitalContext, withHospitalContext } from './HospitalContext';
import HospitalForms from './forms/HospitalForms';
import ModalComponent from '../ModalComponent';
import TableComponent from '../table/TableComponent';
import hospitalHeadCells from './hospitalHeadCells';
import RowTableHospitalComponent from './RowTableHospitalComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { withCustomPaginationContext, useCustomPaginationContext } from '../pagination/PaginationContext';
import PaginationComponent from '../pagination/PaginationComponent';
import FiltersHospitalComponent from './FilterHospitalComponent';
import { getPropValue } from '../../helpers/utils';

function HospitalComponent() {
  const { offset, pageSize } = useCustomPaginationContext();
  const {
    selected,
    loadingList,
    hospitalsList,
    total,
    modalVisible,
    setModalVisible,
    formType,
    selectHospital,
    setParams
  } = useHospitalContext();
  const { currentUserProfile } = useAuthContext();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const cells = match ? [hospitalHeadCells[0]] : hospitalHeadCells;

  const handleReloadList = useCallback(() => {
    setParams({ limit: pageSize, offset });
  }, [pageSize, offset, setParams]);

  const handleFormClose = useCallback(() => {
    handleReloadList();
    selectHospital(null);
  }, [handleReloadList, selectHospital]);

  const handleShowModal = fType => {
    setModalVisible(true, fType);
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <HospitalForms formType={formType} onFormClose={handleFormClose} />
      </ModalComponent>
      <TableComponent
        extraText={
          <Typography>
            <strong>Total: </strong>({total})
          </Typography>
        }
        filters={<FiltersHospitalComponent />}
        addRole={currentUserProfile && currentUserProfile.role.id === 'superadmin'}
        title="Lista de hospitales"
        selected={selected}
        headCells={cells}
        loadingList={loadingList}
        list={hospitalsList}
        setModalVisible={setModalVisible}
        render={(row, index) => (
          <RowTableHospitalComponent
            key={uuid()}
            cells={cells}
            row={row}
            index={index}
            selected={selected}
            selectRow={selectHospital}
            onModalVisible={handleShowModal}
          />
        )}
      />
      <PaginationComponent
        total={total}
        first={getPropValue(hospitalsList[0], 'name')}
        last={getPropValue(hospitalsList[hospitalsList.lenght - 1], 'name')}
      />
    </>
  );
}

export default withHospitalContext(withCustomPaginationContext(HospitalComponent));
