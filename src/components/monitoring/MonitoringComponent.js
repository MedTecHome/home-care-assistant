import React, { useEffect } from 'react';
import uuid from 'uuid4';
import { useMediaQuery } from '@material-ui/core';
import { withMonitoringContext, useMonitoringContext } from './MonitoringContext';
import FiltersMonitoringComponent from './FiltersMonitoringComponent';
import TableComponent from '../table/TableComponent';
import headMonitoringCells from './headMonitoringCells';
import RowMonitoringComponent from './RowMonitoringComponent';

function MonitoringComponent() {
  const { getListToMonitoring, filters, list, loadingList, selected, setSelected } = useMonitoringContext();
  const matchXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const matchSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const cells = matchXS
    ? [headMonitoringCells[0], headMonitoringCells[1]]
    : (matchSM && [headMonitoringCells[0], headMonitoringCells[1], headMonitoringCells[2], headMonitoringCells[3]]) ||
      headMonitoringCells;

  useEffect(() => {
    getListToMonitoring({ filters });
  }, [getListToMonitoring, filters]);

  return (
    <>
      <FiltersMonitoringComponent />
      <TableComponent
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
    </>
  );
}

export default withMonitoringContext(MonitoringComponent);
