import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtil from '@date-io/moment';
import { makeStyles, Typography, Box } from '@material-ui/core';
import { DateRange as DateRangeIcon } from '@material-ui/icons';
import { isEmpty } from '../../helpers/utils';

const useStyles = makeStyles({
  filterRangeDate: {
    display: 'flex',
    justifyContent: 'space-evelyn',
    alignItems: 'center',
    width: '100%'
  },
  errorRoot: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5
  },
  errorText: {
    fontSize: '0.738rem',
    color: 'red'
  }
});

const today = moment();
const defaultStart = today.clone().add(-4, 'days');
const defaultEnd = today.clone().add(3, 'days');

function FiltersRangeDateComponent({ onRangeSet, size = 'small' }) {
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [errorText, setErrorText] = useState('');
  const localClasses = useStyles();

  useEffect(() => {
    onRangeSet([startDate, endDate]);
  }, [startDate, endDate, onRangeSet]);

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtil}>
        <div className={localClasses.filterRangeDate}>
          <DatePicker
            label="Fecha inicio"
            okLabel="Aceptar"
            cancelLabel="Cancelar"
            clearLabel="Limppiar"
            value={startDate}
            onChange={setStartDate}
            autoOk
            size={size}
            inputVariant="outlined"
            format="DD-MM-YYYY"
            onError={setErrorText}
            helperText=""
            InputProps={{
              endAdornment: <DateRangeIcon htmlColor="#666" fontSize="small" />
            }}
          />
          <Box margin={1}>
            <Typography>{' al '}</Typography>
          </Box>
          <DatePicker
            label="Fecha fin"
            okLabel="Aceptar"
            cancelLabel="Cancelar"
            clearLabel="Limppiar"
            value={endDate}
            minDate={startDate}
            onChange={setEndDate}
            autoOk
            size={size}
            inputVariant="outlined"
            format="DD-MM-YYYY"
            minDateMessage="Fecha fin no puede ser menor que Fecha Inicio."
            onError={setErrorText}
            helperText=""
            InputProps={{
              endAdornment: <DateRangeIcon htmlColor="#666" fontSize="small" />
            }}
          />
        </div>
      </MuiPickersUtilsProvider>

      {!isEmpty(errorText) ? (
        <div className={localClasses.errorRoot}>
          <Typography className={localClasses.errorText}>{`Error: ${errorText}`}</Typography>
        </div>
      ) : null}
    </>
  );
}

export default FiltersRangeDateComponent;
