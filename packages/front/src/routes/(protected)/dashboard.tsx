import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected_layout/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return <div>Hello "/dashboard"!</div>
}
