import React, { useCallback, useEffect, useState } from 'react';
import uuid from 'uuid4';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { useTreatmentsContext } from './TreatmentsContext';
import TableComponent from '../table/TableComponent';
import treatmentsHeadCells from './treatmentsHeadCells';
import ModalComponent from '../ModalComponent';
import TreatmentsFormComponent from './forms/TreatmentsFormComponent';
import RowListTreatmentsComponent from './RowListTreatmentsComponent';
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
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState({});
  const classes = useCustomStyles();

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
      <ModalComponent visible={modalVisible}>
        <TreatmentsFormComponent formType={formType} />
      </ModalComponent>
      <TableComponent
        headCells={treatmentsHeadCells}
        loadingList={loadingList}
        list={listTreatments}
        setModalVisible={setModalVisible}
        selected={selected}
        extraText={
          <div className={classes.extraText}>
            <Typography>
              Nombre: <strong>probando</strong>
            </Typography>
          </div>
        }
        render={(row, index) => (
          <RowListTreatmentsComponent
            key={uuid()}
            open={open}
            setOpen={setOpen}
            row={row}
            index={index}
            selected={selected}
            selectRow={selectFromList}
            onModalVisible={handleModalVisible}
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
