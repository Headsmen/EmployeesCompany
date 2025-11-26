import { useForm } from '@mantine/form'
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text, Anchor, Stack } from '@mantine/core'
import { useLogin } from '../../entities/StoreAuth/hooks/useAuth'
import { loginSchema } from '../../entities/StoreAuth/shemas/authShemas'
import type { LoginCredentials } from '../../entities/StoreAuth/model/types'

export function LoginPage() {
  const { mutate: login, isPending, isError, error } = useLogin()

  const form = useForm<LoginCredentials>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const result = loginSchema.safeParse(values)
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

  const handleSubmit = (values: LoginCredentials) => {
    login(values)
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
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
                {error?.message || 'Login failed. Please try again.'}
              </Text>
            )}

            <Button type="submit" fullWidth loading={isPending}>
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}

export default LoginPage
