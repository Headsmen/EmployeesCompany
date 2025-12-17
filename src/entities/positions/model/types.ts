export interface Position {
  id: string;
  name: string;
  code: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePositionDto {
  name: string;
  code: string;
}

export interface UpdatePositionDto extends Partial<CreatePositionDto> {
  id: string;
}
