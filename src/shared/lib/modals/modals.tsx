import { modals } from '@mantine/modals';
import { Text } from '@mantine/core';

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmColor?: string;
}

export const openConfirmModal = ({
  title,
  message,
  confirmLabel = 'Подтвердить',
  cancelLabel = 'Отмена',
  onConfirm,
  onCancel,
  confirmColor = 'blue',
}: ConfirmModalProps) => {
  modals.openConfirmModal({
    title,
    centered: true,
    children: <Text size="sm">{message}</Text>,
    labels: { confirm: confirmLabel, cancel: cancelLabel },
    confirmProps: { color: confirmColor },
    onConfirm,
    onCancel,
  });
};

interface DeleteConfirmModalProps {
  entityName: string;
  onConfirm: () => void;
}

export const openDeleteConfirmModal = ({
  entityName,
  onConfirm,
}: DeleteConfirmModalProps) => {
  openConfirmModal({
    title: 'Подтверждение удаления',
    message: `Вы уверены, что хотите удалить ${entityName}? Это действие нельзя отменить.`,
    confirmLabel: 'Удалить',
    cancelLabel: 'Отмена',
    confirmColor: 'red',
    onConfirm,
  });
};

interface CustomModalProps {
  title: string;
  children: React.ReactNode;
  size?: string | number;
  centered?: boolean;
  withCloseButton?: boolean;
}

export const openCustomModal = ({
  title,
  children,
  size = 'md',
  centered = true,
  withCloseButton = true,
}: CustomModalProps) => {
  modals.open({
    title,
    children,
    size,
    centered,
    withCloseButton,
  });
};

export const closeModal = (id: string) => {
  modals.close(id);
};

export const closeAllModals = () => {
  modals.closeAll();
};
