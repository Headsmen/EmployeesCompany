import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Button } from '@/shared/ui';
import { AddEmployeeForm } from './AddEmployeeForm';

export const AddEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        leftSection={<IconPlus size={18} />}
        onClick={() => setIsModalOpen(true)}
      >
        Добавить сотрудника
      </Button>

      <AddEmployeeForm
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
