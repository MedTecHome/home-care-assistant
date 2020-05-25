import React, { createContext, useState, useContext } from 'react';

const PaginationContext = createContext({});

export const withCustomPaginationContext = WrapperComponent => props => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  return (
    <PaginationContext.Provider
      value={{
        page,
        pageSize,
        setPage,
        setPageSize
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WrapperComponent {...props} />
    </PaginationContext.Provider>
  );
};

export const useCustomPaginationContext = () => {
  const values = useContext(PaginationContext);
  if (!values) throw new Error('useCustomPagination only works inside PaginationContextProvider');

  return {
    page: values.page,
    pageSize: values.pageSize,
    setPage: values.setPage,
    setPageSize: values.setPageSize
  };
};
