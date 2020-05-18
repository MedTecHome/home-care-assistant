import React, { useCallback, useEffect } from 'react';
import uuid from 'uuid4';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListItem from '@material-ui/core/ListItem';
import { useMediaQuery } from '@material-ui/core';
import { useHospitalContext, withHospitalContext } from './HospitalContext';
import HospitalForms from './forms/HospitalForms';
import ModalComponent from '../ModalComponent';
import TableComponent from '../table/TableComponent';
import hospitalHeadCells from './hospitalHeadCells';
import RowTableHospitalComponent from './RowTableHospitalComponent';
import useCustomStyles from '../../jss/globalStyles';
import { useAuthContext } from '../../contexts/AuthContext';

function HospitalComponent() {
  const {
    selected,
    loadingList,
    hospitalsList,
    modalVisible,
    setModalVisible,
    formType,
    getListHospitals,
    selectHospital
  } = useHospitalContext();
  const { currentUserProfile } = useAuthContext();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const cells = match ? [hospitalHeadCells[0]] : hospitalHeadCells;

  const [page, setPage] = React.useState({});
  const classes = useCustomStyles();

  const handleReloadList = useCallback(() => {
    getListHospitals(page);
  }, [getListHospitals, page]);

  useEffect(() => {
    if (formType === null) handleReloadList();
  }, [formType, handleReloadList]);

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
        filters={<></>}
        addRole={currentUserProfile && currentUserProfile.role.id === 'admin'}
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
      <ListItem className={classes.footerList}>
        <div className={classes.pagination}>
          {!loadingList && (
            <>
              <IconButton onClick={() => setPage({ prev: hospitalsList[0] })}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setPage({ next: hospitalsList[hospitalsList.length - 1] })}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </div>
      </ListItem>
    </>
  );
}

export default withHospitalContext(HospitalComponent);
