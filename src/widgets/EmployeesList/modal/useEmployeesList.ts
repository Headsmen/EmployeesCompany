import { useEffect, useState } from 'react'
import { useEmployeesStore, type Employee, type EmployeeStatus } from '@/entities/employees'
import { useEnterprisesStore } from '@/entities/enterprises'
import styles from '../ui/EmployeesList.module.scss'

export const useEmployeesList = () => {
  const [addModalOpened, setAddModalOpened] = useState(false)
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const { employees, fetchEmployees, deleteEmployee, isLoading } = useEmployeesStore()
  const { activeEnterpriseId, getActiveEnterprise } = useEnterprisesStore()

  const activeEnterprise = getActiveEnterprise()

  useEffect(() => {
    if (activeEnterpriseId) {
      fetchEmployees(activeEnterpriseId)
    }
  }, [activeEnterpriseId, fetchEmployees])

  const statusClassMap: Record<EmployeeStatus, string> = {
    'Работает': styles.working,
    'В отпуске': styles.vacation,
    'Уволен': styles.fired,
  }

  const getStatusClassName = (status: EmployeeStatus) => {
    return statusClassMap[status] || ''
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id)
      setDeleteConfirmId(null)
    } catch (error) {
      console.error('Failed to delete employee:', error)
    }
  }

  const handleOpenAddModal = () => setAddModalOpened(true)
  const handleCloseAddModal = () => setAddModalOpened(false)
  const handleOpenEditModal = (employee: Employee) => setEditEmployee(employee)
  const handleCloseEditModal = () => setEditEmployee(null)
  const handleOpenDeleteConfirm = (id: string) => setDeleteConfirmId(id)
  const handleCloseDeleteConfirm = () => setDeleteConfirmId(null)

  return {
    employees,
    isLoading,
    activeEnterprise,
    addModalOpened,
    editEmployee,
    deleteConfirmId,
    getStatusClassName,
    handleDelete,
    handleOpenAddModal,
    handleCloseAddModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenDeleteConfirm,
    handleCloseDeleteConfirm,
  }
}
