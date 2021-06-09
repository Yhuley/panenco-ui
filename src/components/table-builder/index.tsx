import * as React from 'react';
import cx from 'classnames';
import { useTable, useRowSelect, useColumnOrder, usePagination, useBlockLayout, useResizeColumns } from 'react-table';
import { useSticky } from 'react-table-sticky';

import makeData from './makeData';
import { StyledTable } from './style';

export interface TableBuilderProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }: { indeterminate: any }, ref: any) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

export const TableBuilder = React.forwardRef<HTMLDivElement, TableBuilderProps>(
  ({ className, children, ...props }: TableBuilderProps, ref): JSX.Element => {
    const defaultColumns = React.useMemo(
      () => [
        {
          Header: 'First Name',
          accessor: 'firstName',
          sticky: 'left',
        },
        {
          Header: 'Last Name',
          accessor: 'lastName',
        },
        {
          Header: 'Age',
          accessor: 'age',
        },
        {
          Header: 'Visits',
          accessor: 'visits',
        },
        {
          Header: 'Status',
          accessor: 'status',
        },
        {
          Header: 'Profile Progress',
          accessor: 'progress',
        },
      ],
      [],
    );

    const [data, setData] = React.useState(() => makeData(5));
    const [columns, setColumns] = React.useState(defaultColumns);
    const [originalData] = React.useState(data);
    const [skipPageReset, setSkipPageReset] = React.useState(false);

    const handleColumnsCreation = (column) => {
      setColumns((oldColumns) => oldColumns.concat(column));
    };

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
      // We also turn on the flag to not reset the page
      setSkipPageReset(true);
      setData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        }),
      );
    };

    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    React.useEffect(() => {
      setSkipPageReset(false);
    }, [data]);

    const resetData = () => setData(originalData);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      resetResizing,
      selectedFlatRows,
      state: { pageIndex, pageSize, selectedRowIds },
      setColumnOrder,
      visibleColumns,
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        autoResetPage: !skipPageReset,
        updateMyData,
      },
      useBlockLayout,
      useResizeColumns,
      usePagination,
      useColumnOrder,
      useSticky,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((cols) => [
          // Let's make a column for selection
          {
            id: 'selection',
            sticky: 'left',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }: { getToggleAllPageRowsSelectedProps: any }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }: { row: any }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...cols,
        ]);
      },
    );

    const mapById = (arrWithIds) => arrWithIds.map((el) => el.id);

    const swap = (firstElementId, secondElementId) => {
      const swapped = mapById(visibleColumns);

      const firstElementIdIndex = swapped.indexOf(firstElementId);
      const secondElementIdIndex = swapped.indexOf(secondElementId);

      [swapped[firstElementIdIndex], swapped[secondElementIdIndex]] = [
        swapped[secondElementIdIndex],
        swapped[firstElementIdIndex],
      ];

      return swapped;
    };

    const setOrder = (firstElementId, secondElementId) => {
      setColumnOrder(swap(firstElementId, secondElementId));
    };

    const addRow = () => {
      setSkipPageReset(true);

      setData((old) => {
        const ids = mapById(visibleColumns);

        const buff = {};

        ids.map((key) => {
          buff[key] = null;

          return true;
        });

        return old.concat(buff);
      });
    };

    const [tableWidth, setWidth] = React.useState(0);

    return (
      <StyledTable className={cx('TableBuilder', className)}>
        <button type="button" onClick={resetData}>
          Reset Data
        </button>

        <button type="button" onClick={resetResizing}>
          Reset Resizing
        </button>

        <table
          {...getTableProps()}
          ref={(refElem) => {
            if (refElem) {
              setWidth(refElem.offsetWidth);
            }
          }}
          className="table sticky"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key="tr" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => {
                  const showSwapButtons = column.id !== 'selection';

                  const renderLeft = index !== 1 && showSwapButtons;
                  const renderRight = headerGroup.headers.length !== index + 1 && showSwapButtons;

                  return (
                    <th key="th" {...column.getHeaderProps()}>
                      {renderLeft && (
                        <button
                          type="button"
                          onClick={() => {
                            if (headerGroup.headers[index - 1]) {
                              setOrder(column.id, headerGroup.headers[index - 1].id);
                            }
                          }}
                        >
                          Left
                        </button>
                      )}
                      {column.render('Header')}
                      {renderRight && (
                        <button
                          type="button"
                          onClick={() => {
                            if (headerGroup.headers[index + 1]) {
                              setOrder(column.id, headerGroup.headers[index + 1].id);
                            }
                          }}
                        >
                          Right
                        </button>
                      )}

                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                      />
                    </th>
                  );
                })}
              </tr>
            ))}
            <button
              type="button"
              style={{ right: 0, left: tableWidth }}
              className="newColumn"
              onClick={() => {
                handleColumnsCreation({
                  Header: `Column ${columns.length}`,
                  accessor: `createdCol${columns.length}`,
                });
              }}
            >
              Add column
            </button>
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr key="tr" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td key="td" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <button type="button" onClick={() => addRow()} className="newRow">
              Add row
            </button>
          </tbody>
        </table>
        <div className="pagination">
          <button type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const currentPage = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(currentPage);
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSizeValue) => (
              <option key={pageSizeValue} value={pageSizeValue}>
                Show {pageSizeValue}
              </option>
            ))}
          </select>
        </div>

        <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map((d) => d.original),
              },
              null,
              2,
            )}
          </code>
        </pre>
      </StyledTable>
    );
  },
);
