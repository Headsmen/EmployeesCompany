import { Paper, Title, Container, Text, Anchor } from '@mantine/core'
import { Form } from '@/shared/ui'
import { Link } from 'react-router-dom'
import { useRegisterForm } from '../model/useRegisterForm'

export function RegisterForm() {
  const {
    fields,
    initialValues,
    zodSchema,
    handleSubmit,
    errorMessage,
    isLoading,
  } = useRegisterForm()

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create an account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component={Link} to="/login">
          Sign in
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
          submitButton={{ label: 'Create account', type: 'submit' }}
        />
      </Paper>
    </Container>
  )
}
