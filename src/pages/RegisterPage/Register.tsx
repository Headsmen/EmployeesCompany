import { useForm } from '@mantine/form'
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Anchor, Stack } from '@mantine/core'
import { useRegister } from '../../entities/StoreAuth/hooks/useAuth'
import { registerSchema } from '../../entities/StoreAuth/shemas/authShemas'
import type { RegisterData } from '../../entities/StoreAuth/model/types'

export function RegisterPage() {
  const { mutate: register, isPending, isError, error } = useRegister()

  const form = useForm<RegisterData>({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    validate: (values) => {
      const result = registerSchema.safeParse(values)
      if (!result.success) {
        const errors: Record<string, string> = {}
        result.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0].toString()] = issue.message
          }
        })
        return errors
      }
      return {}
    },
  })

  const handleSubmit = (values: RegisterData) => {
    register(values)
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create an account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button">
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="First name"
              placeholder="Your first name"
              required
              {...form.getInputProps('firstName')}
            />

            <TextInput
              label="Last name"
              placeholder="Your last name"
              required
              {...form.getInputProps('lastName')}
            />

            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps('password')}
            />

            {isError && (
              <Text c="red" size="sm">
                {error?.message || 'Registration failed. Please try again.'}
              </Text>
            )}

            <Button type="submit" fullWidth loading={isPending}>
              Create account
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}

export default RegisterPage
