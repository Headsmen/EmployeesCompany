import type { ReactNode } from 'react'
import type { z } from 'zod'

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'select'
  | 'number'
  | 'textarea'
  | 'checkbox'

export interface SelectOption {
  value: string
  label: string
}

export interface BaseFieldConfig {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'email' | 'password' | 'number' | 'textarea'
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select'
  options: SelectOption[]
  searchable?: boolean
  clearable?: boolean
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox'
  description?: string
}

export type FieldConfig =
  | TextFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig

export interface FormAction {
  label: string
  variant?: 'filled' | 'outline' | 'light' | 'subtle'
  onClick?: () => void
  type?: 'submit' | 'button' | 'reset'
  loading?: boolean
  disabled?: boolean
}

export interface FormConfig<T = any> {
  fields: FieldConfig[]
  initialValues: T
  validationSchema?: any
  zodSchema?: z.ZodSchema<T>
  onSubmit: (values: T) => void | Promise<void>
  submitButton?: FormAction
  cancelButton?: FormAction
  additionalActions?: FormAction[]
  errorMessage?: string
  successMessage?: string
  isLoading?: boolean
}

export interface GenericFormProps<T = any> extends Omit<FormConfig<T>, 'onSubmit'> {
  onSubmit: (values: T) => void | Promise<void>
  renderCustomActions?: (isSubmitting: boolean, isValid: boolean) => ReactNode
}
