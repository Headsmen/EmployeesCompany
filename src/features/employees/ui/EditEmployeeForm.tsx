import { useState, useEffect } from 'react';
import { TextInput, Modal } from '@mantine/core';
import { Button, DropDownSelect } from '@/shared/ui';
import {
  useEmployeesStore,
  type EmployeeStatus,
  type Employee,
  type UpdateEmployeeDto,
  EMPLOYEE_STATUS_OPTIONS
} from '@/entities/employees';
import { usePositionsStore } from '@/entities/positions';
import styles from './AddEmployeeForm.module.scss';

interface EditEmployeeFormProps {
  opened: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export const EditEmployeeForm = ({ opened, onClose, employee }: EditEmployeeFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [position, setPosition] = useState<string | null>(null);
  const [status, setStatus] = useState<EmployeeStatus>('Работает');
  const [telegramUrl, setTelegramUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { updateEmployee, isLoading } = useEmployeesStore();
  const { positions, fetchPositions } = usePositionsStore();

  useEffect(() => {
    if (opened && positions.length === 0) {
      fetchPositions();
    }
  }, [opened, positions.length, fetchPositions]);

  useEffect(() => {
    if (employee && opened) {
      const nameParts = employee.fullName.split(' ');
      setLastName(nameParts[0] || '');
      setFirstName(nameParts[1] || '');
      setMiddleName(nameParts[2] || '');

      const pos = positions.find(p => p.name === employee.position);
      setPosition(pos?.id || null);

      setStatus(employee.status);
      setTelegramUrl(employee.telegramUrl || '');
    }
  }, [employee, opened, positions]);

  const positionOptions = positions.map(pos => ({
    value: pos.id,
    label: pos.name,
  }));

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Имя обязательно для заполнения';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна для заполнения';
    }

    if (!position) {
      newErrors.position = 'Должность обязательна для выбора';
    }

    if (telegramUrl.trim() && !isValidTelegramUrl(telegramUrl.trim())) {
      newErrors.telegramUrl = 'Введите корректную ссылку на Telegram';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidTelegramUrl = (url: string): boolean => {
    const telegramPatterns = [
      /^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/,
      /^@[a-zA-Z0-9_]{5,32}$/,
      /^[a-zA-Z0-9_]{5,32}$/
    ];

    return telegramPatterns.some(pattern => pattern.test(url));
  };

  const formatFullName = (): string => {
    const parts = [];
    if (lastName.trim()) parts.push(lastName.trim());
    if (firstName.trim()) parts.push(firstName.trim());
    if (middleName.trim()) parts.push(middleName.trim());

    return parts.join(' ');
  };

  const formatTelegramForDisplay = (): string => {
    if (!telegramUrl.trim()) return '';

    const url = telegramUrl.trim();

    if (url.startsWith('https://t.me/')) {
      return url;
    }

    if (url.startsWith('@')) {
      return `https://t.me/${url.slice(1)}`;
    }

    return `https://t.me/${url}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !employee) {
      return;
    }

    try {
      const fullName = formatFullName();
      const selectedPosition = positionOptions.find(p => p.value === position)?.label || position || '';

      const updateData: UpdateEmployeeDto = {
        id: employee.id,
        fullName,
        position: selectedPosition,
        status,
        telegramUrl: telegramUrl.trim() ? formatTelegramForDisplay() : undefined,
      };

      await updateEmployee(updateData);

      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении сотрудника:', error);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Редактировать сотрудника"
      centered
      size="md"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.nameFields}>
          <TextInput
            label="Фамилия"
            placeholder="Иванов"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
            error={errors.lastName}
            required
            className={styles.nameField}
          />

          <TextInput
            label="Имя"
            placeholder="Иван"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            error={errors.firstName}
            required
            className={styles.nameField}
          />

          <TextInput
            label="Отчество"
            placeholder="Иванович"
            value={middleName}
            onChange={(e) => setMiddleName(e.currentTarget.value)}
            error={errors.middleName}
            className={styles.nameField}
          />
        </div>

        <DropDownSelect
          label="Должность"
          placeholder="Выберите должность"
          value={position}
          onChange={setPosition}
          data={positionOptions}
          error={errors.position}
          required
          searchable
          clearable
        />

        <DropDownSelect
          label="Статус"
          placeholder="Выберите статус"
          value={status}
          onChange={(value) => setStatus(value as EmployeeStatus)}
          data={EMPLOYEE_STATUS_OPTIONS}
          required
        />

        <TextInput
          className='mb-10'
          label="Telegram (опционально)"
          placeholder="@username или просто username"
          value={telegramUrl}
          onChange={(e) => setTelegramUrl(e.currentTarget.value)}
          error={errors.telegramUrl}
        />

        <div className={styles.actions}>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button type="submit" loading={isLoading}>
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};
