import React from 'react';
import { makeStyles, colors } from '@material-ui/core';
import { withMonitoringContext, useMonitoringContext } from './MonitoringContext';
import TableComponent from '../table/TableComponent';
import headMonitoringCells from './headMonitoringCells';
import RowMonitoringComponent from './RowMonitoringComponent';
import { getPropValue } from '../../helpers/utils';
import { withCustomPaginationContext } from '../pagination/PaginationContext';
import TitlePagesComponent from '../text/TitlePagesComponent';

const useStyles = makeStyles({
  divRoot: {
    width: '100%',
    display: 'grid',
    gridGap: 5,
    gridTemplateColumns: 'repeat(auto-fit, minmax(95px, 1fr))',
    '& > span': {
      marginRight: 15
    }
  },
  redSpan: {
    color: colors.red.A700
  },
  yellowSpan: {
    color: colors.yellow.A700
  },
  greenSpan: {
    color: colors.green.A700
  }
});

function LegendTableMonitoring({ total, totalRed = 0, totalYellow = 0, totalGreen = 0 }) {
  const classes = useStyles();
  return (
    <div className={classes.divRoot}>
      <span className={classes.total}>
        <strong>Pacientes: </strong> {total || '-'}
      </span>
      <span className={classes.alertsSpan}>
        <strong>Alertas: </strong> {totalRed || '-'}
      </span>
      <span className={classes.redSpan}>
        <strong>Rojos: </strong> {totalRed || '-'}
      </span>
      <span className={classes.yellowSpan}>
        <strong>Amarillos: </strong> {totalYellow || '-'}
      </span>
      <span className={classes.greenSpan}>
        <strong>Verdes: </strong> {totalGreen || '-'}
      </span>
    </div>
  );
}

function MonitoringComponent() {
  const { list, total, loadingList, selected, setSelectedFromList, legend } = useMonitoringContext();

  return (
    <>
      <TitlePagesComponent text="Panel general" />
      <TableComponent
        extraText={
          <>
            <LegendTableMonitoring
              total={total}
              totalRed={legend.totalRed}
              totalYellow={legend.totalYellow}
              totalGreen={legend.totalGreen}
            />
          </>
        }
        headCells={headMonitoringCells}
        list={list}
        total={total}
        loadingList={loadingList}
        render={(row, index) => (
          <RowMonitoringComponent
            key={getPropValue(row, 'user.id')}
            row={row}
            index={index}
            selected={selected}
            selectRow={setSelectedFromList}
          />
        )}
      />
    </>
  );
}

export default withCustomPaginationContext(withMonitoringContext(MonitoringComponent));
