export interface Enterprise {
  id: string;
  name: string;
  description?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEnterpriseDto {
  name: string;
  description?: string;
  address?: string;
}

export interface UpdateEnterpriseDto extends Partial<CreateEnterpriseDto> {
  id: string;
}
