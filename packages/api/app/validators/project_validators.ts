import User from '#models/user';
import vine, { SimpleMessagesProvider } from '@vinejs/vine'


export const createProjectSchema = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    userId: vine.number().exists( async (_, value) => {
      const row = await User.find(value);
      return row !== null
    })
  })
)
createProjectSchema.messagesProvider = new SimpleMessagesProvider({
  'name.minLength': 'Le nom de la todo doit faire au moins 3 caractères',
  'name.maxLength': 'Le nom de la todo doit faire au plus 255 caractères',
})

export const editProjectSchema = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
  })
)
editProjectSchema.messagesProvider = new SimpleMessagesProvider({
  'name.minLength': 'Le nom de la todo doit faire au moins 3 caractères',
  'name.maxLength': 'Le nom de la todo doit faire au plus 255 caractères',
})

