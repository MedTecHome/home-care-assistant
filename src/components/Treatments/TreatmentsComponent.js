import React, { useCallback, useEffect, useState } from 'react';
import uuid from 'uuid4';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListItem from '@material-ui/core/ListItem';
import { useMediaQuery } from '@material-ui/core';
import { useTreatmentsContext } from './TreatmentsContext';
import TableComponent from '../table/TableComponent';
import treatmentsHeadCells from './treatmentsHeadCells';
import ModalComponent from '../ModalComponent';
import TreatmentsFormComponent from './forms/TreatmentsFormComponent';
import RowListTreatmentsComponent from './RowListTreatmentsComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import useCustomStyles from '../../jss/globalStyles';

function TreatmentsComponent() {
  const {
    listTreatments,
    modalVisible,
    getListOfTreatments,
    loadingList,
    selected,
    setModalVisible,
    formType,
    selectFromList,
    filters
  } = useTreatmentsContext();
  const { isDoctor } = useAuthContext();
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState({});
  const classes = useCustomStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const cells = match ? [treatmentsHeadCells[0]] : treatmentsHeadCells;

  const handleLoadList = useCallback(() => {
    getListOfTreatments({ filters, ...page });
  }, [getListOfTreatments, filters, page]);

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
      <ListItem className={classes.footerList}>
        <div className={classes.pagination}>
          {!loadingList && (
            <>
              <IconButton onClick={() => setPage({ prev: listTreatments[0] })}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setPage({ next: listTreatments[listTreatments.length - 1] })}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </div>
      </ListItem>
    </>
  );
}

export default TreatmentsComponent;
