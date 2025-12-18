import { useMemo } from 'react'
import { z } from 'zod'
import { useLogin } from '@/entities/session'
import type { LoginCredentials } from '@/shared/api'
import type { FieldConfig } from '@/shared/ui'

export const useLoginForm = () => {
  const { mutate: login, isPending, isError, error } = useLogin()

  const fields: FieldConfig[] = useMemo(() => [
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

  const initialValues: LoginCredentials = {
    email: '',
    password: '',
  }

  const zodSchema = z.object({
    email: z
      .string()
      .min(1, 'Email обязателен для заполнения')
      .email('Неверный формат email'),
    password: z
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов'),
  })

  const handleSubmit = (values: LoginCredentials) => {
    login(values)
  }

  const errorMessage = isError
    ? error?.message || 'Login failed. Please try again.'
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
