import { ActionIcon, Tooltip } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';
import { useLogoutButton } from './useLogoutButton';

export const LogoutButton = () => {
  const { handleClick, isPending } = useLogoutButton();

  return (
    <Tooltip label="Выйти" position="bottom">
      <ActionIcon
        variant="light"
        color="dark"
        size="lg"
        onClick={handleClick}
        disabled={isPending}
      >
        <IconLogout2 size={20} />
      </ActionIcon>
    </Tooltip>
  );
};
