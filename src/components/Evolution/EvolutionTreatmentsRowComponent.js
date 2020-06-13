import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import { TableRow, TableCell } from '@material-ui/core';
import PopupMedicineDetailComponent from './PopupMedicineDetailComponent';
import { isEmpty } from '../../helpers/utils';
import { getMedicineById } from '../../services/medicines';

function EvolutionTreatmentsRowComponent({ treatment, aux, classes }) {
  const [medicine, setMedicine] = useState(null);

  const fetchMedicine = useCallback(async () => {
    const result = await getMedicineById(treatment.medicines);
    setMedicine(result);
  }, [treatment.medicines]);

  useEffect(() => {
    if (isEmpty(treatment.medicineSetting)) {
      fetchMedicine();
    } else {
      setMedicine(treatment.medicineSetting);
    }
  }, [treatment.medicineSetting, fetchMedicine]);

  return (
    <TableRow key={treatment.id}>
      <TableCell>{treatment.medicines}</TableCell>
      {aux.map((d, index) => (
        <TableCell
          key={index.toString()}
          className={
            moment(moment(d).format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD')) ? classes.cellToday : undefined
          }
          align="center"
        >
          {moment(moment(d).format('YYYY-MM-DD')).isBetween(
            moment.unix(treatment.startDate).format('YYYY-MM-DD'),
            moment.unix(treatment.endDate).format('YYYY-MM-DD'),
            undefined,
            '[]'
          ) ? (
            <PopupMedicineDetailComponent data={medicine} />
          ) : (
            ''
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default EvolutionTreatmentsRowComponent;
