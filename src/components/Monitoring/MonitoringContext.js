import React, { createContext, useState, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getMonitoring from '../../services/monitoring';
import { useCustomPaginationContext } from '../pagination/PaginationContext';

const MonitoringContext = createContext({});

export const withMonitoringContext = WrapperComponent => () => {
  const [list, setListAction] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingList, setLoadingList] = useState(false);
  const [selected, setSelected] = useState(null);
  const [params, setParams] = useState({});
  const [action, setAction] = useState('');
  const [legend, setLegend] = useState({ totalRed: 0, totalYellow: 0, totalGreen: 0 });
  const { pageSize, page, resetPagination } = useCustomPaginationContext();
  const mounted = useRef(true);

  const fetchList = useCallback(async (limit, pag, filters) => {
    const res = await getMonitoring(limit, pag, filters);
    if (mounted.current === true) {
      setListAction(res.data);
      setTotal(res.total);
      setLoadingList(false);
      setAction('');
    }
  }, []);

  console.log('render');

  useEffect(() => {
    mounted.current = true;
    const { parent: parentId, ...filters } = params;
    if (parentId) {
      setLoadingList(true);
      fetchList(pageSize, page, { parent: parentId, ...filters });
    }
    return () => {
      mounted.current = false;
    };
  }, [params, pageSize, page, action, fetchList]);

  const setSelectedFromList = useCallback(
    id => {
      const result = list.find(item => item.id === id) || null;
      setSelected(result);
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
        setSelectedFromList,
        params,
        legend,
        setLegend,
        setParams,
        resetPagination
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
    loadingList: values.loadingList,
    selected: values.selected,
    setSelectedFromList: values.setSelectedFromList,
    params: values.params,
    setParams: values.setParams,
    legend: values.legend,
    setLegend: values.setLegend,
    resetPagination: values.resetPagination
  };
};
