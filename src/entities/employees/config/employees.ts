import type { EmployeeStatus } from '../model/types';

export const EMPLOYEE_STATUS_OPTIONS: { value: EmployeeStatus; label: string }[] = [
  { value: 'Работает', label: 'Работает' },
  { value: 'В отпуске', label: 'В отпуске' },
  { value: 'Уволен', label: 'Уволен' },
];
