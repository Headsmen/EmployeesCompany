import { DropDownSelect } from '@/shared/ui';
import { useEnterpriseSelector } from '../model/useEnterpriseSelector';

export const EnterpriseSelector = () => {
  const {
    enterpriseOptions,
    activeEnterpriseId,
    isLoading,
    handleChange,
  } = useEnterpriseSelector();

  return (
    <DropDownSelect
      label="Предприятие"
      placeholder="Выберите предприятие"
      value={activeEnterpriseId}
      onChange={handleChange}
      data={enterpriseOptions}
      disabled={isLoading}
      searchable
    />
  );
};
