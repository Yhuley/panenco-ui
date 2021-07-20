import * as React from 'react';
import cx from 'classnames';
import { useTable, useRowSelect, useColumnOrder, usePagination, useBlockLayout, useResizeColumns } from 'react-table';
import { useSticky } from 'react-table-sticky';

import { useMode, useTheme } from 'utils/hooks';
import { ButtonIcon } from 'components/button-icon';
import { Icon } from 'components/icon';
import { StyledTable } from './style';
import makeData from './makeData';

export interface TableBuilderProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}
export type CompareElementIdType = {
  firstElementId: string;
  secondElementId: string;
};

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: { indeterminate: any; onChange: any }, ref: any) => {
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
  },
);

// Create an editable cell renderer
const EditableCell = ({ value: initialValue }: { value: string }): JSX.Element => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e): void => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  // const onBlur = (): void => {
  //   updateMyData(index, id, value);
  // };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} />;
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

export const TableBuilder = React.forwardRef<HTMLDivElement, TableBuilderProps>(
  ({ className, style }: TableBuilderProps, ref): JSX.Element => {
    const defaultColumns = React.useMemo(
      () => [
        {
          Header: 'First Name',
          accessor: 'firstName',
          // sticky: 'left',
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
    const [activeCell, setActiveCell] = React.useState<{ row: number; column: number }>({
      row: -1,
      column: -1,
    });
    const [originalData] = React.useState(data);
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const activeDiv = React.useRef<HTMLDivElement>(null);

    const handleColumnsCreation = (column): void => {
      setColumns((oldColumns) => oldColumns.concat(column));
    };

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value): void => {
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

    const resetData = (): void => setData(originalData);

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
          // Column for selection
          {
            id: 'selection',
            sticky: 'left',
            width: 56,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({
              getToggleAllPageRowsSelectedProps,
            }: {
              getToggleAllPageRowsSelectedProps: any;
            }): JSX.Element => <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />,
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }: { row: any }): JSX.Element => {
              return <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
            },
          },
          ...cols,
        ]);
      },
    );

    const handleKeyDown = (e): void => {
      switch (e.keyCode) {
        case 37: {
          // left arrow click
          e.preventDefault();
          setActiveCell({
            row: activeCell.row,
            column: activeCell.column && activeCell.column > 0 ? activeCell.column - 1 : 0,
          });

          break;
        }
        case 38: {
          // up arrow click
          e.preventDefault();
          setActiveCell({
            row: activeCell.row && activeCell.row > 0 ? activeCell.row - 1 : 0,
            column: activeCell.column,
          });
          break;
        }
        case 39: {
          // right arrow click
          e.preventDefault();
          setActiveCell({
            row: activeCell.row,
            column: activeCell.column < visibleColumns.length - 1 ? activeCell.column + 1 : visibleColumns.length - 1,
          });

          break;
        }
        case 40: {
          // down arrow click
          e.preventDefault();
          setActiveCell({
            row: activeCell.row < data.length - 1 ? activeCell.row + 1 : data.length - 1,
            column: activeCell.column,
          });

          break;
        }
        default:
          break;
      }
    };

    React.useEffect(() => {
      const activeKek = document.querySelector(
        `[data-active-row="${activeCell.row}"][data-active-column="${activeCell.column}"]`,
      );

      const cellInput = activeKek?.firstElementChild as HTMLInputElement;
      const inputValue = cellInput?.value;
      const focusSelection = inputValue ? inputValue.length : 0;

      cellInput?.focus();

      if (cellInput?.type === 'text') {
        if (activeCell) cellInput?.setSelectionRange(focusSelection, focusSelection);
      }
    }, [activeCell.column, activeCell.row]);

    React.useEffect(() => {
      document.addEventListener('keydown', handleKeyDown, false);
      return (): void => {
        document.removeEventListener('keydown', handleKeyDown, false);
      };
    }, [handleKeyDown]);

    const mapById = (arrWithIds): string[] => arrWithIds.map((el) => el.id);

    function swap({ firstElementId, secondElementId }: CompareElementIdType): string[] {
      const swapped = mapById(visibleColumns);

      const firstElementIdIndex = swapped.indexOf(firstElementId);
      const secondElementIdIndex = swapped.indexOf(secondElementId);

      [swapped[firstElementIdIndex], swapped[secondElementIdIndex]] = [
        swapped[secondElementIdIndex],
        swapped[firstElementIdIndex],
      ];

      return swapped;
    }

    const setOrder = (firstElementId: string, secondElementId: string): void => {
      setColumnOrder(swap({ firstElementId, secondElementId }));
    };

    const addRow = (): void => {
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

    const theme = useTheme();
    const { mode } = useMode();

    return (
      <StyledTable className={cx('TableBuilder', className)} theme={theme} mode={mode} ref={ref} style={style}>
        <button type="button" onClick={resetData}>
          Reset Data
        </button>

        <button type="button" onClick={resetResizing}>
          Reset Resizing
        </button>

        <table
          {...getTableProps()}
          ref={(refElem): void => {
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
                      <div className="thContainer">
                        {renderLeft && (
                          <ButtonIcon
                            iconClassName="controls"
                            icon={Icon.icons.chevronLeft}
                            onClick={(): void => {
                              if (headerGroup.headers[index - 1]) {
                                setOrder(column.id, headerGroup.headers[index - 1].id);
                              }
                            }}
                          />
                        )}
                        <div className="thContainerHeader">{column.render('Header')}</div>
                        {renderRight && (
                          <ButtonIcon
                            iconClassName="controls"
                            icon={Icon.icons.chevronRight}
                            onClick={(): void => {
                              if (headerGroup.headers[index + 1]) {
                                setOrder(column.id, headerGroup.headers[index + 1].id);
                              }
                            }}
                          />
                        )}

                        <div
                          {...column.getResizerProps()}
                          className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                        />
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
            <button
              type="button"
              style={{ right: 0, left: tableWidth }}
              className="newColumn"
              onClick={(): void => {
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
                  {row.cells.map((cell, index) => {
                    const isActiveCell = index === activeCell.column && cell.row.index === activeCell.row;
                    return (
                      <td
                        key="td"
                        {...cell.getCellProps()}
                        aria-hidden="true"
                        onClick={(): void => {
                          setActiveCell({ row: cell.row.index, column: index });
                        }}
                      >
                        <div
                          className="tdContent"
                          style={{ border: `2px solid ${isActiveCell ? theme.colors.accent : 'transparent'}` }}
                          ref={activeDiv}
                          data-active-row={Number(i)}
                          data-active-column={Number(index)}
                        >
                          {cell.render('Cell')}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <button type="button" onClick={(): void => addRow()} className="newRow">
              Add row
            </button>
          </tbody>
        </table>
        <div className="pagination">
          <button type="button" onClick={(): void => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>
          <button type="button" onClick={(): void => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>
          <button type="button" onClick={(): void => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>
          <button type="button" onClick={(): void => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>
          <span>
            Page
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <span>
            | Go to page:
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e): void => {
                const currentPage = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(currentPage);
              }}
              style={{ width: '100px' }}
            />
          </span>
          <select
            value={pageSize}
            onChange={(e): void => {
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
