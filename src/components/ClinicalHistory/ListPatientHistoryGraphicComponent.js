import React from 'react';
import { LinearProgress } from '@material-ui/core';

function ListPatientHistoryGraphicComponent({ loadingList, historyList }) {
  const groupTypeTest = historyList.map(ht => ({
    type: ht.type,
    list: historyList.filter(fht => ht.type === fht.type)
  }));

  const uniqueResult = Array.from(new Set(groupTypeTest.map(a => a.type))).map(type => {
    return groupTypeTest.find(a => a.type === type);
  });

  console.log(uniqueResult);

  if (loadingList) return <LinearProgress />;
  return <div />;
}

export default ListPatientHistoryGraphicComponent;
