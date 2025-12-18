import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Loader, Alert } from '@mantine/core'
import { IconAlertCircle, IconChevronUp, IconChevronDown } from '@tabler/icons-react'
import type { TableConfig } from './types'
import styles from './Table.module.scss'

interface TableProps<TData> extends TableConfig<TData> {}

export const Table = <TData,>({
  columns,
  data,
  isLoading = false,
  error = null,
  emptyMessage = 'Нет данных для отображения',
  onRowClick,
  getRowId,
}: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: getRowId as any,
  })

  if (isLoading && data.length === 0) {
    return (
      <div className={styles.centered}>
        <Loader size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Ошибка" color="red">
        {error}
      </Alert>
    )
  }

  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const canSort = header.column.getCanSort()
                const sortDirection = header.column.getIsSorted()

                return (
                  <th
                    key={header.id}
                    className={canSort ? styles.sortable : ''}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      width: header.getSize() !== 150 ? header.getSize() : undefined,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {canSort && (
                        <span className={styles.sortIcon}>
                          {sortDirection === 'asc' && <IconChevronUp size={16} />}
                          {sortDirection === 'desc' && <IconChevronDown size={16} />}
                        </span>
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row.original)}
              style={{
                cursor: onRowClick ? 'pointer' : 'default',
              }}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
