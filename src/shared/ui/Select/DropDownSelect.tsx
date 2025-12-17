import { Select as MantineSelect, type SelectProps } from '@mantine/core';
import styles from './DropDownSelect.module.scss';

type CustomSelectProps = SelectProps;

export const DropDownSelect = (props: CustomSelectProps) => {
  return (
    <MantineSelect
      {...props}
      classNames={{
        input: styles.input,
        dropdown: styles.dropdown,
        option: styles.option,
        label: styles.label,
        ...props.classNames,
      }}
    />
  );
};
