import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth_layout/auth/register')({
  component: Register,
})

function Register() {
  return <div>Hello "/auth/register"!</div>
}
