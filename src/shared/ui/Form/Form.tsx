import { Formik, Form as FormikForm, Field, type FieldProps } from 'formik'
import { TextInput, PasswordInput, Textarea, Checkbox, Stack, Text } from '@mantine/core'
import { Button } from '@/shared/ui'
import { DropDownSelect } from '@/shared/ui'
import { zodToFormikValidate } from '@/shared/lib'
import type { GenericFormProps, FieldConfig, TextFieldConfig, SelectFieldConfig, CheckboxFieldConfig } from './types'
import type { z } from 'zod'
import styles from './Form.module.scss'

export function Form<T extends Record<string, any>>({
  fields,
  initialValues,
  validationSchema,
  zodSchema,
  onSubmit,
  submitButton = { label: 'Отправить', type: 'submit' },
  cancelButton,
  additionalActions = [],
  errorMessage,
  successMessage,
  isLoading = false,
  renderCustomActions,
}: GenericFormProps<T>) {
  const validate = zodSchema ? zodToFormikValidate(zodSchema as z.ZodSchema<T>) : undefined
  const renderField = (fieldConfig: FieldConfig) => {
    const { name, label, placeholder, required, disabled, className } = fieldConfig

    if (fieldConfig.type === 'select') {
      const selectConfig = fieldConfig as SelectFieldConfig
      return (
        <Field key={name} name={name}>
          {({ field, meta, form }: FieldProps) => (
            <DropDownSelect
              label={label}
              placeholder={placeholder}
              value={field.value}
              onChange={(value) => form.setFieldValue(name, value)}
              onBlur={() => form.setFieldTouched(name, true)}
              data={selectConfig.options}
              error={meta.touched && meta.error ? meta.error : undefined}
              required={required}
              disabled={disabled || isLoading}
              searchable={selectConfig.searchable}
              clearable={selectConfig.clearable}
              className={className}
            />
          )}
        </Field>
      )
    }

    if (fieldConfig.type === 'checkbox') {
      const checkboxConfig = fieldConfig as CheckboxFieldConfig
      return (
        <Field key={name} name={name}>
          {({ field, meta }: FieldProps) => (
            <Checkbox
              {...field}
              label={label}
              description={checkboxConfig.description}
              error={meta.touched && meta.error ? meta.error : undefined}
              disabled={disabled || isLoading}
              className={className}
              checked={field.value}
            />
          )}
        </Field>
      )
    }

    const textConfig = fieldConfig as TextFieldConfig

    if (textConfig.type === 'password') {
      return (
        <Field key={name} name={name}>
          {({ field, meta }: FieldProps) => (
            <PasswordInput
              {...field}
              label={label}
              placeholder={placeholder}
              error={meta.touched && meta.error ? meta.error : undefined}
              required={required}
              disabled={disabled || isLoading}
              className={className}
            />
          )}
        </Field>
      )
    }

    if (textConfig.type === 'textarea') {
      return (
        <Field key={name} name={name}>
          {({ field, meta }: FieldProps) => (
            <Textarea
              {...field}
              label={label}
              placeholder={placeholder}
              error={meta.touched && meta.error ? meta.error : undefined}
              required={required}
              disabled={disabled || isLoading}
              className={className}
              minRows={3}
            />
          )}
        </Field>
      )
    }

    return (
      <Field key={name} name={name}>
        {({ field, meta }: FieldProps) => (
          <TextInput
            {...field}
            type={textConfig.type}
            label={label}
            placeholder={placeholder}
            error={meta.touched && meta.error ? meta.error : undefined}
            required={required}
            disabled={disabled || isLoading}
            className={className}
          />
        )}
      </Field>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting, isValid }) => (
        <FormikForm className={styles.form}>
          <Stack>
            {fields.map(renderField)}

            {errorMessage && (
              <Text c="red" size="sm">
                {errorMessage}
              </Text>
            )}

            {successMessage && (
              <Text c="green" size="sm">
                {successMessage}
              </Text>
            )}

            {renderCustomActions ? (
              renderCustomActions(isSubmitting, isValid)
            ) : (
              <div className={styles.actions}>
                {cancelButton && (
                  <Button
                    variant={cancelButton.variant || 'outline'}
                    onClick={cancelButton.onClick}
                    disabled={isSubmitting || isLoading || cancelButton.disabled}
                  >
                    {cancelButton.label}
                  </Button>
                )}

                {additionalActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'outline'}
                    type={action.type || 'button'}
                    onClick={action.onClick}
                    disabled={isSubmitting || isLoading || action.disabled}
                    loading={action.loading}
                  >
                    {action.label}
                  </Button>
                ))}

                {submitButton && (
                  <Button
                    type={submitButton.type || 'submit'}
                    variant={submitButton.variant || 'filled'}
                    loading={isSubmitting || isLoading || submitButton.loading}
                    disabled={submitButton.disabled}
                  >
                    {submitButton.label}
                  </Button>
                )}
              </div>
            )}
          </Stack>
        </FormikForm>
      )}
    </Formik>
  )
}
