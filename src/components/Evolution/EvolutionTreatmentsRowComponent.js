import React, { useState, useCallback, useEffect, memo } from 'react';
import moment from 'moment';
import { TableRow, TableCell } from '@material-ui/core';
import PopupMedicineDetailComponent from './PopupMedicineDetailComponent';
import { getPropValue } from '../../helpers/utils';
import { getMedicineById } from '../../services/medicines';
import useCustomStyles from '../../jss/globalStyles';

function EvolutionTreatmentsRowComponent({ treatment, aux, classes }) {
  const [medicine, setMedicine] = useState(null);
  const globalClasses = useCustomStyles();

  const fetchMedicine = useCallback(async (id, medSetting) => {
    const result = await getMedicineById(id);
    setMedicine({ ...result, ...medSetting });
  }, []);

  useEffect(() => {
    const medicineSetting = JSON.parse(treatment.medicineSetting);
    fetchMedicine(treatment.medicines, medicineSetting);
    return () => {
      setMedicine(null);
    };
  }, [treatment.medicines, treatment.medicineSetting, fetchMedicine]);

  return (
    <TableRow key={treatment.id}>
      <TableCell className={globalClasses.textUpperCase}>{getPropValue(medicine, 'name')}</TableCell>
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

export default memo(EvolutionTreatmentsRowComponent);
