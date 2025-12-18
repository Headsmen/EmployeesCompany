import { useLogout } from '../model/useAuth'
import { openConfirmModal } from '@/shared/lib'

export const useLogoutButton = () => {
  const { mutate: logout, isPending } = useLogout()

  const handleClick = () => {
    openConfirmModal({
      title: 'Подтверждение выхода',
      message: 'Вы уверены, что хотите выйти из системы?',
      confirmLabel: 'Выйти',
      cancelLabel: 'Отмена',
      confirmColor: 'red',
      onConfirm: () => logout(),
    })
  }

  return {
    handleClick,
    isPending,
  }
}
