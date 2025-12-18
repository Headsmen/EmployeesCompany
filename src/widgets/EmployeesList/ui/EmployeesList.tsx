import { Modal } from '@mantine/core';
import { Button } from '@/shared/ui';
import { AddOrEditEmployeeForm } from '@/features/employees';
import { useEmployeesList } from '../modal/useEmployeesList';
import styles from './EmployeesList.module.scss'

export const EmployeesList = () => {
  const {
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
  } = useEmployeesList();

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
        <Button onClick={handleOpenAddModal}>
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
                      onClick={() => handleOpenEditModal(employee)}
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                    <button
                      className={`${styles.iconButton} ${styles.delete}`}
                      onClick={() => handleOpenDeleteConfirm(employee.id)}
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

      <AddOrEditEmployeeForm
        opened={addModalOpened}
        onClose={handleCloseAddModal}
      />

      <AddOrEditEmployeeForm
        opened={editEmployee !== null}
        onClose={handleCloseEditModal}
        employee={editEmployee}
      />

      <Modal
        opened={deleteConfirmId !== null}
        onClose={handleCloseDeleteConfirm}
        title="Подтверждение удаления"
        centered
      >
        <p>Вы уверены, что хотите удалить этого сотрудника?</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <Button
            variant="outline"
            onClick={handleCloseDeleteConfirm}
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
