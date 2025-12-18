import { Paper, Title, Container, Text, Anchor } from '@mantine/core'
import { Form } from '@/shared/ui'
import { Link } from 'react-router-dom'
import { useLoginForm } from '../model/useLoginForm'

export function LoginForm() {
  const {
    fields,
    initialValues,
    zodSchema,
    handleSubmit,
    errorMessage,
    isLoading,
  } = useLoginForm()

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account yet?{' '}
        <Anchor size="sm" component={Link} to="/register">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form
          fields={fields}
          initialValues={initialValues}
          zodSchema={zodSchema}
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
          isLoading={isLoading}
          submitButton={{ label: 'Sign in', type: 'submit' }}
        />
      </Paper>
    </Container>
  )
}
