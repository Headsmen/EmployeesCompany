import { useEffect, useState } from 'react';
import { Modal } from '@mantine/core';
import { Button } from '@/shared/ui';
import { useEmployeesStore, type Employee, type EmployeeStatus } from '@/entities/employees';
import { useEnterprisesStore } from '@/entities/enterprises';
import { AddEmployeeForm, EditEmployeeForm } from '@/features/employees';
import styles from './EmployeesList.module.scss';

export const EmployeesList = () => {
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const { employees, fetchEmployees, deleteEmployee, isLoading } = useEmployeesStore();
  const { activeEnterpriseId, getActiveEnterprise } = useEnterprisesStore();

  const activeEnterprise = getActiveEnterprise();

  useEffect(() => {
    if (activeEnterpriseId) {
      fetchEmployees(activeEnterpriseId);
    }
  }, [activeEnterpriseId, fetchEmployees]);

  const getStatusClassName = (status: EmployeeStatus) => {
    switch (status) {
      case 'Работает':
        return styles.working;
      case 'В отпуске':
        return styles.vacation;
      case 'Уволен':
        return styles.fired;
      default:
        return '';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  if (!activeEnterprise) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          Выберите предприятие для просмотра сотрудников
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Сотрудники: {activeEnterprise.name}
        </h1>
        <Button onClick={() => setAddModalOpened(true)}>
          Добавить сотрудника
        </Button>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Загрузка...</div>
      ) : employees.length === 0 ? (
        <div className={styles.empty}>
          Нет сотрудников. Добавьте первого сотрудника!
        </div>
      ) : (
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>ФИО</th>
              <th>Должность</th>
              <th>Статус</th>
              <th>Telegram</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{employee.fullName}</td>
                <td className={styles.tableCell}>{employee.position}</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.status} ${getStatusClassName(employee.status)}`}>
                    {employee.status}
                  </span>
                </td>
                <td className={styles.tableCell}>
                  {employee.telegramUrl ? (
                    <a
                      href={employee.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.telegramLink}
                    >
                      Открыть
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button
                      className={`${styles.iconButton} ${styles.edit}`}
                      onClick={() => setEditEmployee(employee)}
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                    <button
                      className={`${styles.iconButton} ${styles.delete}`}
                      onClick={() => setDeleteConfirmId(employee.id)}
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <AddEmployeeForm
        opened={addModalOpened}
        onClose={() => setAddModalOpened(false)}
      />

      <EditEmployeeForm
        opened={editEmployee !== null}
        onClose={() => setEditEmployee(null)}
        employee={editEmployee}
      />

      <Modal
        opened={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="Подтверждение удаления"
        centered
      >
        <p>Вы уверены, что хотите удалить этого сотрудника?</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <Button
            variant="outline"
            onClick={() => setDeleteConfirmId(null)}
          >
            Отмена
          </Button>
          <Button
            onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            style={{ backgroundColor: '#dc3545' }}
          >
            Удалить
          </Button>
        </div>
      </Modal>
    </div>
  );
};
