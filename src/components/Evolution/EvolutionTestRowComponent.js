import React from 'react';
import moment from 'moment';
import { TableRow, TableCell, Typography, makeStyles } from '@material-ui/core';
import { getPropValue } from '../../helpers/utils';
import PopupTestTypeComponent from './PopupTestTypeComponet';
import { testFormsNames } from '../../helpers/constants';
import IconTestComponent from '../ClinicalHistory/IconTestComponent';

const useStyles = makeStyles({
  iconSize: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  textIconLabel: {
    display: 'flex',
    alignItems: 'center'
  }
});

function getSymbolo(type) {
  switch (type) {
    case 'heartrate': {
      return ' (LPM)';
    }
    case 'breathing': {
      return ' (RPM)';
    }
    case 'exercises': {
      return ' (Pasos)';
    }
    case 'weight': {
      return ' (kg)';
    }
    default:
      return '';
  }
}

function EvolutionTestRowComponent({ clinicaltest, aux, classes, handleClickParamter }) {
  const localClasses = useStyles();

  return (
    <TableRow>
      <TableCell>
        <div className={localClasses.textIconLabel}>
          <IconTestComponent type={getPropValue(clinicaltest, 'type')} className={localClasses.iconSize} />
          <Typography
            className={classes.textLink}
            onClick={() => handleClickParamter(getPropValue(clinicaltest, 'type'))}
            color="inherit"
          >
            {getPropValue(clinicaltest, 'type') === 'breathing'
              ? 'Frecuencia Respiratoria'
              : getPropValue(
                  testFormsNames.find(tf => tf.id === getPropValue(clinicaltest, 'type')),
                  'name'
                ) || '-'}
            {getSymbolo(getPropValue(clinicaltest, 'type'))}
          </Typography>
        </div>
      </TableCell>
      {aux.map((d, index1) => {
        return (
          <TableCell
            key={index1.toString()}
            className={
              moment(moment(d).format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD'))
                ? classes.cellToday
                : undefined
            }
            align="center"
          >
            <div>
              {clinicaltest.list
                .filter(a => {
                  return moment(moment(d).format('YYYY-MM-DD')).isSame(
                    moment.unix(a.clinicalDate).format('YYYY-MM-DD')
                  );
                })
                .map((b, index2) => {
                  return <PopupTestTypeComponent key={index2.toString()} data={b} />;
                })}
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default EvolutionTestRowComponent;
