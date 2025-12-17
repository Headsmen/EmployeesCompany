import { useLogout } from '../model/useAuth';
import { ActionIcon, Tooltip, Modal, Button, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout2 } from '@tabler/icons-react'

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout();
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogout = () => {
    logout();
    close();
  };

  return (
    <>
      <Tooltip label="Выйти" position="bottom">
        <ActionIcon
          variant="light"
          color="dark"
          size="lg"
          onClick={open}
          disabled={isPending}
        >
          <IconLogout2 size={20} />
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={opened}
        onClose={close}
        title="Подтверждение выхода"
        centered
      >
        <Text mb="md">Вы уверены, что хотите выйти из системы?</Text>

        <Group justify="flex-end">
          <Button variant="default" onClick={close}>
            Отмена
          </Button>
          <Button
            color="red"
            onClick={handleLogout}
            loading={isPending}
          >
            Выйти
          </Button>
        </Group>
      </Modal>
    </>
  );
};
