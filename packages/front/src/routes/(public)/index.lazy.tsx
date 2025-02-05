import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_public_layout/')({
  component: Home,
})

function Home() {
  const navigate = useNavigate()
  return (
    <>
      <h1>Acceuil</h1>
      <Link to="/auth/login">Se connecter</Link>
    </>
  )
}
