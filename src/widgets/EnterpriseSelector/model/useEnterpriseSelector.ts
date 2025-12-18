import { useEffect, useMemo } from 'react'
import { useEnterprisesStore } from '@/entities/enterprises'

export const useEnterpriseSelector = () => {
  const {
    enterprises,
    activeEnterpriseId,
    setActiveEnterprise,
    fetchEnterprises,
    isLoading
  } = useEnterprisesStore()

  useEffect(() => {
    if (enterprises.length === 0) {
      fetchEnterprises()
    }
  }, [enterprises.length, fetchEnterprises])

  const enterpriseOptions = useMemo(
    () => enterprises.map(ent => ({
      value: ent.id,
      label: ent.name,
    })),
    [enterprises]
  )

  const handleChange = (value: string | null) => {
    if (value) {
      setActiveEnterprise(value)
    }
  }

  return {
    enterpriseOptions,
    activeEnterpriseId,
    isLoading,
    handleChange,
  }
}
