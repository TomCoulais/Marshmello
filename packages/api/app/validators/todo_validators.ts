import Status from '#models/status'
import vine, { SimpleMessagesProvider, Vine, VineValidator } from '@vinejs/vine'

export const createSchema = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    description: vine.string().nullable(),
    statusId: vine.number().exists(async (_, value) => {
      const row = await Status.find(value)
      return row !== null
    }),
    tag: vine.string().nullable()
  })
)

createSchema.messagesProvider = new SimpleMessagesProvider({
  'name.minLength': 'Le nom de la todo doit faire au moins 3 caractères',
  'name.maxLength': 'Le nom de la todo doit faire au plus 255 caractères',
})

export const updateSchema = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    completed: vine.boolean(),
    description: vine.string().nullable(),
    statusId: vine.number().exists(async (_, value) => {
      const row = await Status.find(value);
      return row !== null;
    })
  })
)

updateSchema.messagesProvider = new SimpleMessagesProvider({
  'name.minLength': 'Le nom de la todo doit faire au moins 3 caractères',
  'name.maxLength': 'Le nom de la todo doit faire au plus 255 caractères',
})
