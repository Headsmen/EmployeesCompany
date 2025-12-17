import { useEffect } from 'react';
import { DropDownSelect } from '@/shared/ui';
import { useEnterprisesStore } from '@/entities/enterprises';

export const EnterpriseSelector = () => {
  const {
    enterprises,
    activeEnterpriseId,
    setActiveEnterprise,
    fetchEnterprises,
    isLoading
  } = useEnterprisesStore();

  useEffect(() => {
    if (enterprises.length === 0) {
      fetchEnterprises();
    }
  }, [enterprises.length, fetchEnterprises]);

  const enterpriseOptions = enterprises.map(ent => ({
    value: ent.id,
    label: ent.name,
  }));

  return (
    <DropDownSelect
      label="Предприятие"
      placeholder="Выберите предприятие"
      value={activeEnterpriseId}
      onChange={(value) => value && setActiveEnterprise(value)}
      data={enterpriseOptions}
      disabled={isLoading}
      searchable
    />
  );
};
