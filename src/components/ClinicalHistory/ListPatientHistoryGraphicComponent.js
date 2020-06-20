import React from 'react';
import { LinearProgress, Typography } from '@material-ui/core';

function ListPatientHistoryGraphicComponent({ loadingList, historyList }) {
  const groupTypeTest = historyList.map(ht => ({
    type: ht.type,
    list: historyList.filter(fht => ht.type === fht.type)
  }));

  const uniqueResult = Array.from(new Set(groupTypeTest.map(a => a.type))).map(type => {
    return groupTypeTest.find(a => a.type === type);
  });

  if (loadingList) return <LinearProgress />;
  return (
    <div>
      {uniqueResult.map(element => (
        <Typography key={element.type}>{element.type}</Typography>
      ))}
    </div>
  );
}

export default ListPatientHistoryGraphicComponent;
