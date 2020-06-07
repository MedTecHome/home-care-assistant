import React, { createContext, useState, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getMonitoring from '../../services/monitoring';

const MonitoringContext = createContext({});

export const withMonitoringContext = WrapperComponent => () => {
  const { RegisterMessage } = useMessageContext();
  const [list, setListAction] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingList, setLoadingList] = useState(false);
  const [selected, setSlcted] = useState(null);
  const [prms, setPrms] = useState({});
  const [legend, setLegend] = useState({ totalRed: 0, totalYellow: 0, totalGreen: 0 });
  const mounted = useRef(true);

  const setParams = useCallback(values => {
    setPrms(prevP => ({ ...prevP, ...values }));
  }, []);
  const params = useMemo(() => prms, [prms]);

  useEffect(() => {
    mounted.current = true;
    const { parent: parentId, limit, offset, ...filters } = params;
    if (parentId) {
      setLoadingList(true);
      getMonitoring(limit, offset, { parent: parentId, ...filters })
        .then(res => {
          if (mounted.current === true) {
            setListAction(res.data);
            setTotal(res.total);
          }
        })
        .catch(e => RegisterMessage(ERROR_MESSAGE, e, 'MonitoringContext-getMonitoring'))
        .finally(() => {
          if (mounted.current === true) setLoadingList(false);
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [params, RegisterMessage]);

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
        params,
        legend,
        setLegend,
        setParams
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
    setSelected: values.setSelected,
    params: values.params,
    setParams: values.setParams,
    legend: values.legend,
    setLegend: values.setLegend
  };
};
