import {
  type AuthUser,
  isAlreadyAuthenticated,
  useAuthActions,
} from '@/stores/auth_store'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_auth_layout/auth/login')({
  beforeLoad: () => {
    if (isAlreadyAuthenticated()) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: '/' })
    }
  },
  component: Login,
})

const schema = z.object({
  username: z.string().min(3).max(50),
  password: z.string(),
})

type Schema = z.infer<typeof schema>

interface MutationPayload {
  username: string
  password: string
}

function Login() {
  const { login } = useAuthActions()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: async (payload: MutationPayload) => {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + '/auth/login',
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      if (!response.ok) {
        console.log('not ok')
        return
      }
      const user = (await response.json()) as AuthUser
      login(user)
      void navigate({ to: '/' })
    },
  })
  const form = useForm<Schema>({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      loginMutation.mutate(values.value)
      console.log({ formData: values.value })
    },
  })

  return (
    <>
      <h1>Connexion</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <form.Field
          name="username"
          validators={{ onChange: schema.shape.username }}
        >
          {(fieldApi) => (
            <>
              <label htmlFor={fieldApi.name}>Nom d'utilisateur</label>
              <input
                type="text"
                required
                id={fieldApi.name}
                name={fieldApi.name}
                value={fieldApi.state.value}
                onChange={(event) =>
                  fieldApi.handleChange(event.currentTarget.value)
                }
              />
              {fieldApi.state.meta.errors.length > 0 &&
                fieldApi.state.meta.errors.map((error, idx) => (
                  <em key={idx}>{error}</em>
                ))}
            </>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{ onChange: schema.shape.password }}
        >
          {(fieldApi) => (
            <>
              <label htmlFor={fieldApi.name}>Mot de passe</label>
              <input
                type="password"
                required
                id={fieldApi.name}
                name={fieldApi.name}
                value={fieldApi.state.value}
                onChange={(event) =>
                  fieldApi.handleChange(event.currentTarget.value)
                }
              />
              {fieldApi.state.meta.errors.length > 0 &&
                fieldApi.state.meta.errors.map((error, idx) => (
                  <em key={idx}>{error}</em>
                ))}
            </>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => (
            <button type="submit" disabled={!canSubmit}>
              Connexion
            </button>
          )}
        </form.Subscribe>
      </form>
    </>
  )
}
