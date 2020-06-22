import React, { Suspense } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useMediaQuery } from '@material-ui/core';
import { DELETE_FORM_TEXT, DETAILS_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import StandardDetailButtonIcon from '../buttons/StandardDetailButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import useCustomStyles from '../../jss/globalStyles';
import { getPropValue } from '../../helpers/utils';
import GenericAsyncNomenclator from '../text/AsyncNomenclatorText';

function RowListMedicineComponent({ row, selected, selectRow, onModalVisible }) {
  const classes = useCustomStyles();
  const matchXs = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const matchSm = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Suspense>
      <TableRow
        className={classes.tableRow}
        hover
        onClick={() => selectRow(row.id)}
        tabIndex={-1}
        key={row.id}
        selected={selected && selected.id === row.id}
      >
        <TableCell>{row.name}</TableCell>
        <TableCell align="center">
          {`${getPropValue(row, 'concentrationCant') || '-'} `}
          <GenericAsyncNomenclator id={getPropValue(row, 'concentrationType')} nomenclator="concentrations" />
        </TableCell>
        <TableCell align="center">
          {`${getPropValue(row, 'doseCant') || '-'} `}
          <GenericAsyncNomenclator id={getPropValue(row, 'doseType')} nomenclator="dosis" />
        </TableCell>
        {!matchXs && (
          <TableCell>
            <GenericAsyncNomenclator id={getPropValue(row, 'administrationType')} name="aministrationroute" />
          </TableCell>
        )}
        {!matchXs && !matchSm && <TableCell align="center">{row.frequency || '-'}</TableCell>}
        <TableCell align="center">
          <ButtonGroup variant="text" aria-label="outlined primary button group">
            <StandardDetailButtonIcon onClick={() => onModalVisible(DETAILS_FORM_TEXT)} />
            <EditButtonIcon onClick={() => onModalVisible(EDIT_FORM_TEXT)} />
            <DeleteButtonIcon onClick={() => onModalVisible(DELETE_FORM_TEXT)} />
          </ButtonGroup>
        </TableCell>
      </TableRow>
    </Suspense>
  );
}
export default RowListMedicineComponent;
