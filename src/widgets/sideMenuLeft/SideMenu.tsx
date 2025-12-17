import styles from './styles/SideMenu.module.scss'
import { useSessionStore } from '@/entities/session'
import { EnterpriseSelector } from '@/widgets/EnterpriseSelector'
import { IconUser, IconBuilding, IconUsers } from '@tabler/icons-react'

export const SideMenu = () => {
  const { session, isAuthenticated } = useSessionStore()
  const user = session?.user

  return (
    <div className={styles.SideMenu}>
      <div className={styles.userSection}>
        {isAuthenticated && user ? (
          <div className={styles.userInfo}>
            <div className={styles.userBlock}>
              <IconUser size={20} className={styles.icon} />
              <div className={styles.label}>Текущий пользователь</div>
              <div className={styles.userName}>{user.name}</div>
            </div>

            <div className={styles.companyBlock}>
              <IconBuilding size={20} className={styles.icon} />
              <div className={styles.label}>Выбор предприятия</div>
              <EnterpriseSelector />
            </div>

            <nav className={styles.navigation}>
              <div className={`${styles.menuItem} ${styles.active}`}>
                <IconUsers size={20} className={styles.menuIcon} />
                <span>Сотрудники</span>
              </div>
            </nav>
          </div>
        ) : (
          <div className={styles.userNotAuth}>
            Не авторизован
          </div>
        )}
      </div>
    </div>
  )
}