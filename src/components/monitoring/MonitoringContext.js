import React, { createContext, useState, useCallback, useContext } from 'react';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import getMonitoringListAction from './actions/MonitoringActions';
import { ERROR_MESSAGE } from '../../commons/globalText';

const MonitoringContext = createContext({});

export const withMonitoringContext = WrapperComponent => () => {
  const { RegisterMessage } = useMessageContext();
  const [list, setListAction] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingList, setLoadingList] = useState(false);
  const [selected, setSlcted] = useState(null);
  const [filters, setFiltersAction] = useState({});
  const [legend, setLegend] = useState({ totalRed: 0, totalYellow: 0, totalGreen: 0 });

  const getListToMonitoring = useCallback(
    async params => {
      setLoadingList(true);
      try {
        const result = await getMonitoringListAction({ ...params, filters });
        setListAction(result.data);
        setTotal(result.total);
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'MonitoringContext - getList');
      } finally {
        setLoadingList(false);
      }
    },
    [filters, RegisterMessage]
  );

  const setFilters = useCallback(f => {
    setFiltersAction(f);
  }, []);

  const setSelected = useCallback(
    id => {
      const result = list.find(item => item.id === id) || null;
      setSlcted(result);
    },
    [list]
  );

  return (
    <MonitoringContext.Provider
      value={{
        list,
        total,
        setTotal,
        loadingList,
        selected,
        setSelected,
        filters,
        legend,
        setLegend,
        setFilters,
        getListToMonitoring
      }}
    >
      <WrapperComponent />
    </MonitoringContext.Provider>
  );
};

export const useMonitoringContext = () => {
  const values = useContext(MonitoringContext);
  if (!values) throw new Error('useMonitoringContext only works inside MonitoringContextProvider');

  return {
    list: values.list,
    total: values.total,
    setTotal: values.setTotal,
    getListToMonitoring: values.getListToMonitoring,
    loadingList: values.loadingList,
    selected: values.selected,
    setSelected: values.setSelected,
    filters: values.filters,
    setFilters: values.setFilters,
    legend: values.legend,
    setLegend: values.setLegend
  };
};
