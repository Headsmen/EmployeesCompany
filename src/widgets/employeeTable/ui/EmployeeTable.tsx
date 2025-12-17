// widgets/employeeTable/ui/EmployeeTable.tsx
import { useEffect, useState } from 'react';
import { Table, Badge, ActionIcon, Group, Loader, Alert } from '@mantine/core';
import { IconEdit, IconTrash, IconAlertCircle } from '@tabler/icons-react';
import { useEmployeesStore, type Employee, type EmployeeStatus } from '@/entities/employees';
import { useEnterprisesStore } from '@/entities/enterprises';
import styles from './EmployeeTable.module.scss';
import { EditEmployeeForm } from '@/features/employees';

const STATUS_COLORS: Record<EmployeeStatus, string> = {
  'Работает': 'green',
  'В отпуске': 'blue',
  'Уволен': 'red',
};

export const EmployeeTable = () => {
  const { employees, isLoading, error, fetchEmployees, deleteEmployee } = useEmployeesStore();
  const { activeEnterpriseId } = useEnterprisesStore();
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (activeEnterpriseId) {
      fetchEmployees(activeEnterpriseId);
    }
  }, [activeEnterpriseId, fetchEmployees]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
      try {
        await deleteEmployee(id);
      } catch (error) {
        console.error('Ошибка при удалении сотрудника:', error);
      }
    }
  };

  if (isLoading && employees.length === 0) {
    return (
      <div className={styles.centered}>
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Ошибка" color="red">
        {error}
      </Alert>
    );
  }

  if (employees.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Список сотрудников пуст. Добавьте первого сотрудника!</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.tableContainer}>
        <Table highlightOnHover className={styles.table}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ФИО</Table.Th>
              <Table.Th>Должность</Table.Th>
              <Table.Th>Статус</Table.Th>
              <Table.Th>Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {employees.map((employee) => (
              <Table.Tr key={employee.id}>
                <Table.Td>{employee.fullName}</Table.Td>
                <Table.Td>{employee.position}</Table.Td>
                <Table.Td>
                  <Badge color={STATUS_COLORS[employee.status]} variant="light">
                    {employee.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => setEditingEmployee(employee)}
                      title="Редактировать"
                    >
                      <IconEdit size={18} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => handleDelete(employee.id)}
                      title="Удалить"
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>

      <EditEmployeeForm
        employee={editingEmployee}
        opened={editingEmployee !== null}
        onClose={() => setEditingEmployee(null)}
      />
    </>
  );
};
