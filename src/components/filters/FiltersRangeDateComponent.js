import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtil from '@date-io/moment';
import { makeStyles, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles({
  filterRangeDate: {
    display: 'flex',
    justifyContent: 'space-evelyn',
    alignItems: 'center',
    width: '100%'
  }
});

const today = moment();
const defaultStart = today.clone().add(-10, 'days');
const defaultEnd = today.clone().add(3, 'days');

function FiltersRangeDateComponent({ onRangeSet, size = 'small' }) {
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const localClasses = useStyles();

  useEffect(() => {
    onRangeSet([startDate, endDate]);
  }, [startDate, endDate, onRangeSet]);

  return (
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
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default FiltersRangeDateComponent;
