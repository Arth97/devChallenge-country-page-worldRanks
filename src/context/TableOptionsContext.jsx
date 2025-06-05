import React, { createContext, useState } from 'react';

export const TableOptionsContext = createContext({
  sort: 'name',
  setSort: (value) => {},
  regions: [],
  setRegions: (value) => {},
  status: { unMember: false, independent: false },
  setStatus: (value) => {},
});

export const TableOptionsProvider = ({ children }) => {
  const [sort, setSort] = useState('name');
  const [regions, setRegions] = useState([]);
  const [status, setStatus] = useState({
    unMember: false,
    independent: false,
  });

  return (
    <TableOptionsContext.Provider value={{
      sort, setSort,
      regions, setRegions,
      status, setStatus
    }}>
      {children}
    </TableOptionsContext.Provider>
  );
};