import { useMemo, useEffect } from 'react'
import { z } from 'zod'
import { useEmployeesStore, type Employee, type CreateEmployeeDto, type UpdateEmployeeDto, EMPLOYEE_STATUS_OPTIONS, type EmployeeStatus } from '@/entities/employees'
import { usePositionsStore } from '@/entities/positions'
import { useEnterprisesStore } from '@/entities/enterprises'
import type { FieldConfig } from '@/shared/ui'
import { isValidTelegramUrl, formatTelegramUrl, formatFullName, parseFullName } from '@/shared/lib'

interface EmployeeFormValues {
  firstName: string
  lastName: string
  middleName?: string
  position: string | null
  status: EmployeeStatus
  telegramUrl?: string
}

interface UseEmployeeFormProps {
  employee?: Employee | null
  onSuccess?: () => void
}

export const useEmployeeForm = ({ employee, onSuccess }: UseEmployeeFormProps) => {
  const { addEmployee, updateEmployee, isLoading } = useEmployeesStore()
  const { positions, fetchPositions } = usePositionsStore()
  const { activeEnterpriseId } = useEnterprisesStore()

  const isEditMode = !!employee

  useEffect(() => {
    if (positions.length === 0) {
      fetchPositions()
    }
  }, [positions.length, fetchPositions])

  const positionOptions = useMemo(
    () => positions.map(pos => ({
      value: pos.id,
      label: pos.name,
    })),
    [positions]
  )

  const initialValues: EmployeeFormValues = useMemo(() => {
    if (employee) {
      const { lastName, firstName, middleName } = parseFullName(employee.fullName)
      const position = positions.find(p => p.name === employee.position)

      return {
        firstName,
        lastName,
        middleName,
        position: position?.id || null,
        status: employee.status,
        telegramUrl: employee.telegramUrl || '',
      }
    }

    return {
      firstName: '',
      lastName: '',
      middleName: '',
      position: null,
      status: 'Работает',
      telegramUrl: '',
    }
  }, [employee, positions])

  const fields: FieldConfig[] = useMemo(() => [
    {
      name: 'lastName',
      label: 'Фамилия',
      type: 'text',
      placeholder: 'Иванов',
      required: true,
    },
    {
      name: 'firstName',
      label: 'Имя',
      type: 'text',
      placeholder: 'Иван',
      required: true,
    },
    {
      name: 'middleName',
      label: 'Отчество',
      type: 'text',
      placeholder: 'Иванович',
    },
    {
      name: 'position',
      label: 'Должность',
      type: 'select',
      placeholder: 'Выберите должность',
      options: positionOptions,
      required: true,
      searchable: true,
      clearable: true,
    },
    {
      name: 'status',
      label: 'Статус',
      type: 'select',
      placeholder: 'Выберите статус',
      options: EMPLOYEE_STATUS_OPTIONS,
      required: true,
    },
    {
      name: 'telegramUrl',
      label: 'Telegram (опционально)',
      type: 'text',
      placeholder: '@username или просто username',
    },
  ], [positionOptions])

  const zodSchema = z.object({
    firstName: z
      .string()
      .min(1, 'Имя обязательно для заполнения'),
    lastName: z
      .string()
      .min(1, 'Фамилия обязательна для заполнения'),
    middleName: z.string().optional(),
    position: z
      .string()
      .nullable()
      .refine((val) => val !== null && val !== '', {
        message: 'Должность обязательна для выбора',
      }),
    status: z
      .string()
      .min(1, 'Статус обязателен для выбора') as z.ZodType<EmployeeStatus>,
    telegramUrl: z
      .string()
      .refine((value) => {
        if (!value || !value.trim()) return true
        return isValidTelegramUrl(value.trim())
      }, {
        message: 'Введите корректную ссылку на Telegram',
      })
      .optional(),
  })

  const handleSubmit = async (values: EmployeeFormValues) => {
    const fullName = formatFullName(values.lastName, values.firstName, values.middleName || '')
    const selectedPosition = positionOptions.find(p => p.value === values.position)?.label || values.position || ''
    const formattedTelegramUrl = values.telegramUrl?.trim() ? formatTelegramUrl(values.telegramUrl) : undefined

    if (isEditMode && employee) {
      const updateData: UpdateEmployeeDto = {
        id: employee.id,
        fullName,
        position: selectedPosition,
        status: values.status,
        telegramUrl: formattedTelegramUrl,
      }

      await updateEmployee(updateData)
    } else {
      if (!activeEnterpriseId) {
        console.error('Не выбрана компания')
        return
      }

      const createData: CreateEmployeeDto = {
        fullName,
        position: selectedPosition,
        status: values.status,
        enterpriseId: activeEnterpriseId,
        telegramUrl: formattedTelegramUrl,
      }

      await addEmployee(createData)
    }

    onSuccess?.()
  }

  return {
    fields,
    initialValues,
    zodSchema,
    handleSubmit,
    isLoading,
    isEditMode,
  }
}
