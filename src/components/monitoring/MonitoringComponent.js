import React from 'react';
import { makeStyles, colors } from '@material-ui/core';
import { withMonitoringContext, useMonitoringContext } from './MonitoringContext';
import FiltersMonitoringComponent from './FiltersMonitoringComponent';
import TableComponent from '../table/TableComponent';
import headMonitoringCells from './headMonitoringCells';
import RowMonitoringComponent from './RowMonitoringComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { getPropValue } from '../../helpers/utils';
import PaginationComponent from '../pagination/PaginationComponent';
import { withCustomPaginationContext } from '../pagination/PaginationContext';

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
  const { currentUserProfile } = useAuthContext();

  return (
    <>
      <FiltersMonitoringComponent currentUserProfile={currentUserProfile} />
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
      <PaginationComponent total={total} />
    </>
  );
}

export default withCustomPaginationContext(withMonitoringContext(MonitoringComponent));
