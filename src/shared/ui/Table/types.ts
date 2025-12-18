import type { ColumnDef } from '@tanstack/react-table'
import type { ReactNode } from 'react'

export interface TableConfig<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  isLoading?: boolean
  error?: string | null
  emptyMessage?: string
  onRowClick?: (row: TData) => void
  getRowId?: (row: TData) => string
}

export interface TableColumn<TData> {
  id: string
  header: string
  accessorKey?: keyof TData
  cell?: (row: TData) => ReactNode
  enableSorting?: boolean
  size?: number
}
