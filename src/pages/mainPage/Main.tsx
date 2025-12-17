import { Container } from '@mantine/core';
import { SideMenu } from '@/widgets/sideMenuLeft';
import { EmployeesList } from '@/widgets/EmployeesList';
import styles from './Main.module.scss';

export const Main = () => {
  return (
    <div className={styles.mainLayout}>
      <SideMenu />

      <main className={styles.content}>
        <Container className={styles.container}>

          <EmployeesList />
        </Container>
      </main>
    </div>
  );
};

export default Main;
