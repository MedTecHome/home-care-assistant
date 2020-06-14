import React from 'react';
import moment from 'moment';
import { TableRow, TableCell, Typography } from '@material-ui/core';
import { getPropValue } from '../../helpers/utils';
import PopupTestTypeComponent from './PopupTestTypeComponet';
import { testFormsNames } from '../../helpers/constants';

function EvolutionTestRowComponent({ clinicaltest, aux, classes, handleClickParamter }) {
  return (
    <TableRow>
      <TableCell>
        <Typography
          className={classes.textLink}
          onClick={() => handleClickParamter(getPropValue(clinicaltest, 'type'))}
          color="inherit"
        >
          {getPropValue(
            testFormsNames.find(tf => tf.id === getPropValue(clinicaltest, 'type')),
            'name'
          ) || '?'}
        </Typography>
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
