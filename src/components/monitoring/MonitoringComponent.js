import React, { useEffect } from 'react';
import uuid from 'uuid4';
import { useMediaQuery, Typography, makeStyles, colors } from '@material-ui/core';
import { withMonitoringContext, useMonitoringContext } from './MonitoringContext';
import FiltersMonitoringComponent from './FiltersMonitoringComponent';
import TableComponent from '../table/TableComponent';
import headMonitoringCells from './headMonitoringCells';
import RowMonitoringComponent from './RowMonitoringComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { getPropValue } from '../../helpers/utils';
import PaginationComponent from '../pagination/PaginationComponet';
import { withCustomPaginationContext, useCustomPaginationContext } from '../pagination/PaginationContext';

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
  const { page, pageSize } = useCustomPaginationContext();
  const { getListToMonitoring, list, total, loadingList, selected, setSelected, legend } = useMonitoringContext();
  const { currentUserProfile } = useAuthContext();
  const classes = useStyles();
  const matchXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const matchSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const cells = matchXS
    ? [headMonitoringCells[0], headMonitoringCells[1]]
    : (matchSM && [headMonitoringCells[0], headMonitoringCells[1], headMonitoringCells[2], headMonitoringCells[3]]) ||
      headMonitoringCells;

  useEffect(() => {
    getListToMonitoring({ limit: pageSize, offset: page * pageSize });
  }, [getListToMonitoring, page, pageSize]);

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
        headCells={cells}
        list={list}
        loadingList={loadingList}
        render={(row, index) => (
          <RowMonitoringComponent
            key={uuid()}
            cells={cells}
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

export default withMonitoringContext(withCustomPaginationContext(MonitoringComponent));
