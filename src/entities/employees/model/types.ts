// entities/employees/types/employee.ts
export type EmployeeStatus = 'Работает' | 'В отпуске' | 'Уволен';

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