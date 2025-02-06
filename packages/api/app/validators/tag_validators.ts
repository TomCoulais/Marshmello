import Todo from '#models/todo'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createSchema = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(30),
    description: vine.string().nullable().optional(),
    todoId: vine.number().exists(async (_, value) => {
      const row = await Todo.find(value)
      return row !== null
    }).optional()
  })
)

createSchema.messagesProvider = new SimpleMessagesProvider({
  'name.minLength': 'Le nom du tag doit faire au moins 3 caractères.',
  'name.maxLength': 'Le nom du tag doit faire au plus 30 caractères.',
})

export const updateSchema = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    description: vine.string().nullable().optional(),
    todoId: vine.number().exists(async (_, value) => {
      const row = await Todo.find(value)
      return row !== null
    }).optional()
  })
)

updateSchema.messagesProvider = new SimpleMessagesProvider({
  'name.minLength': 'Le nom du tag doit faire au moins 3 caractères.',
  'name.maxLength': 'Le nom du tag doit faire au plus 30 caractères.',
})
