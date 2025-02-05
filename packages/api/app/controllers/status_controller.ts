import { HttpContext } from '@adonisjs/core/http';

import Project from '#models/project';
import Status from '#models/status';
import { createStatusSchema, updateStatusSchema } from '#validators/status_validators';

export default class StatusController {
	async index({ auth, params, response }: HttpContext) {
		if (auth.use('web').isLoggedOut) {
			return response.unauthorized();
		}

		const project = await Project.findByOrFail({ uuid: params.projectUuid });
		const statuses = await Status.findManyBy({
			projectId: project.id,
		});

		return response.json(statuses.map((status) => status.serialize({ fields: ['uuid', 'name'] })));
	}

	async show({ auth, params, response }: HttpContext) {
		if (auth.use('web').isLoggedOut) {
			return response.unauthorized();
		}

		const status = await Status.findByOrFail({
			uuid: params.uuid,
		});

		return response.json(status.serialize());
	}

	async store({ auth, request, response }: HttpContext) {
		if (auth.use('web').isLoggedOut) {
			return response.unauthorized();
		}

		const payload = await request.validateUsing(createStatusSchema);
		const status = await Status.create(payload);

		return response.created(status.serialize());
	}

	async update({ auth, params, request, response }: HttpContext) {
		if (auth.use('web').isLoggedOut) {
			return response.unauthorized();
		}

		const status = await Status.findByOrFail({
			uuid: params.uuid,
		});

		const payload = await request.validateUsing(updateStatusSchema);
		await status.merge(payload).save();

		return response.json(status.serialize());
	}

	async destroy({ auth, params, response }: HttpContext) {
		if (auth.use('web').isLoggedOut) {
			return response.unauthorized();
		}

		const status = await Status.findByOrFail({
			uuid: params.uuid,
		});

		await status.delete();

		return response.noContent();
	}
}
