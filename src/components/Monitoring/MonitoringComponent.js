import React from 'react';
import { Typography, makeStyles, colors } from '@material-ui/core';
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
  hospitalText: {
    textAlign: 'right',
    textTransform: 'uppercase',
    textDecoration: 'underline'
  },
  divRoot: {
    width: '100%',
    display: 'flex',
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
        <strong>Pacientes: </strong> ({total})
      </span>
      <span className={classes.alertsSpan}>
        <strong>Alertas: </strong> ({totalRed})
      </span>
      <span className={classes.redSpan}>
        <strong>Rojos: </strong> ({totalRed})
      </span>
      <span className={classes.yellowSpan}>
        <strong>Amarillos: </strong> ({totalYellow})
      </span>
      <span className={classes.greenSpan}>
        <strong>Verdes: </strong> ({totalGreen})
      </span>
    </div>
  );
}

function MonitoringComponent() {
  const { list, total, loadingList, selected, setSelected, legend } = useMonitoringContext();
  const { currentUserProfile } = useAuthContext();
  const classes = useStyles();

  return (
    <>
      <FiltersMonitoringComponent currentUserProfile={currentUserProfile} />
      <TableComponent
        extraText={
          <>
            <Typography className={classes.hospitalText} variant="h6">
              {getPropValue(currentUserProfile, 'hospital.name')}
            </Typography>
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
            selectRow={setSelected}
          />
        )}
      />
      <PaginationComponent total={total} />
    </>
  );
}

export default withCustomPaginationContext(withMonitoringContext(MonitoringComponent));
