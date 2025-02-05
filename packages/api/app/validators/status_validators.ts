import Status from '#models/status'
import Project from '#models/project'
import vine, { SimpleMessagesProvider, Vine, VineValidator } from '@vinejs/vine'

export const createStatusSchema = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    description: vine.string().nullable(),
    projectId: vine.number().exists(async (_, value) => {
      const row = await Project.find(value);
      return row !== null;
    })
  })
)

createStatusSchema.messagesProvider = new SimpleMessagesProvider({
  'name.minLength': 'Le nom de la todo doit faire au moins 3 caractères',
  'name.maxLength': 'Le nom de la todo doit faire au plus 255 caractères',
})

export const updateStatusSchema = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    description: vine.string().nullable(),
  })
)

updateStatusSchema.messagesProvider = new SimpleMessagesProvider({
  'name.minLength': 'Le nom de la todo doit faire au moins 3 caractères',
  'name.maxLength': 'Le nom de la todo doit faire au plus 255 caractères',
})
