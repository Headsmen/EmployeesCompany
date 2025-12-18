import { useMemo } from 'react'
import { z } from 'zod'
import { useRegister } from '@/entities/session'
import type { RegisterData } from '@/shared/api'
import type { FieldConfig } from '@/shared/ui'

export const useRegisterForm = () => {
  const { mutate: register, isPending, isError, error } = useRegister()

  const fields: FieldConfig[] = useMemo(() => [
    {
      name: 'firstName',
      label: 'First name',
      type: 'text',
      placeholder: 'Your first name',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last name',
      type: 'text',
      placeholder: 'Your last name',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'your@email.com',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Your password',
      required: true,
    },
  ], [])

  const initialValues: RegisterData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  const zodSchema = z.object({
    firstName: z
      .string()
      .min(1, 'Имя обязательно для заполнения'),
    lastName: z
      .string()
      .min(1, 'Фамилия обязательна для заполнения'),
    email: z
      .string()
      .min(1, 'Email обязателен для заполнения')
      .email('Неверный формат email'),
    password: z
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов'),
  })

  const handleSubmit = (values: RegisterData) => {
    register(values)
  }

  const errorMessage = isError
    ? error?.message || 'Registration failed. Please try again.'
    : undefined

  return {
    fields,
    initialValues,
    zodSchema,
    handleSubmit,
    errorMessage,
    isLoading: isPending,
  }
}
