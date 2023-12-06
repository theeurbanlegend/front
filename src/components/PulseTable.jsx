import React from 'react';
import { useTable } from 'react-table';

const PulseTable = ({ pulses }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Pulse Time',
        accessor: 'createdAt',
        Cell: ({ value }) => {
          const createdAt = new Date(value);
          const month = createdAt.toLocaleString('default', { month: 'short' });
          return `${month} ${createdAt.getDate()}, ${createdAt.getFullYear()} ${createdAt.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
          })}`;
        },
      },
      {
        Header: 'Execution Time',
        accessor: 'exeTime',
      },
      {
        Header: 'Verified Users',
        accessor: 'verified',
      },
      {
        Header: 'All Users',
        accessor: 'allUsers',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: pulses });

  return (
    <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={{ borderBottom: '2px solid #ddd', padding: '12px', textAlign: 'center' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={{ borderBottom: index === rows.length - 1 ? '2px solid #ddd' : '1px solid #ddd' }}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} style={{ padding: '12px', textAlign: 'center' }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PulseTable;
