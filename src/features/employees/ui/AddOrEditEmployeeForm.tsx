import { Modal } from '@mantine/core'
import { Form } from '@/shared/ui'
import { useEmployeeForm } from '../modal/useEmployeeForm'
import type { Employee } from '@/entities/employees'

interface AddOrEditEmployeeFormProps {
  opened: boolean
  onClose: () => void
  employee?: Employee | null
}

export const AddOrEditEmployeeForm = ({ opened, onClose, employee }: AddOrEditEmployeeFormProps) => {
  const {
    fields,
    initialValues,
    zodSchema,
    handleSubmit,
    isLoading,
    isEditMode,
  } = useEmployeeForm({
    employee,
    onSuccess: onClose,
  })

  const title = isEditMode ? 'Редактировать сотрудника' : 'Добавить сотрудника'
  const submitLabel = isEditMode ? 'Сохранить' : 'Добавить'

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      size="md"
    >
      <Form
        fields={fields}
        initialValues={initialValues}
        zodSchema={zodSchema}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitButton={{ label: submitLabel, type: 'submit' }}
        cancelButton={{ label: 'Отмена', onClick: onClose }}
      />
    </Modal>
  )
}
