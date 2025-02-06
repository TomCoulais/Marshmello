import type { HttpContext } from '@adonisjs/core/http'

import Tag from '#models/tag'
import { createSchema, updateSchema } from '#validators/tag_validators'

export default class TagController {
    async index({ params, auth, response }: HttpContext) {
      if (auth.use('web').isLoggedOut){
        return response.unauthorized();
      }
      const tags = await Tag.all()

      return response.json(tags)
    }

    async show({ params, response }: HttpContext) {
      const tags = await Tag.findByOrFail({ uuid: params.uuid })

      return response.json(tags)
    }

    async create({ request, auth, response }: HttpContext) {
      if (auth.use('web').isLoggedOut) {
        return response.unauthorized();
      }
      const payload = await request.validateUsing(createSchema);
      const tags = await Tag.create(payload);

      return response.created(tags);


    }

    async update({ auth, params, request, response }: HttpContext) {
      if (auth.use('web').isLoggedOut) {
        return response.unauthorized();
      }

      try {
        const tags = await Tag.findByOrFail({ uuid: params.uuid });
        const payload = await request.validateUsing(updateSchema);

        await tags.merge(payload).save();
        return response.json(tags);
      } catch (error) {
        console.log(error);
        return response.status(422).json({
          message: 'Validation error',
          errors: error.messages, 
        });
      }
    }

    async delete({ auth, params, response }: HttpContext) {
      if (auth.use('web').isLoggedOut) {
        return response.unauthorized();
      }
      const tags = await Tag.findByOrFail({ uuid: params.uuid });
      await tags.delete();
      return response.noContent();
    }
}
