// entities/employees/types/employee.ts
export type EmployeeStatus = 'Работает' | 'В отпуске' | 'Уволен';

export const EMPLOYEE_STATUS_OPTIONS: { value: EmployeeStatus; label: string }[] = [
  { value: 'Работает', label: 'Работает' },
  { value: 'В отпуске', label: 'В отпуске' },
  { value: 'Уволен', label: 'Уволен' },
];

export interface Employee {
  id: string;
  fullName: string;
  position: string;
  status: EmployeeStatus;
  enterpriseId: string;
  telegramUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEmployeeDto {
  fullName: string;
  position: string;
  status: EmployeeStatus;
  enterpriseId: string;
  telegramUrl?: string;
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> {
  id: string;
}