import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

import Project from '#models/project';
import Status from '#models/status';
import User from '#models/user';

test.group('Status', (group) => {
	group.each.setup(() => testUtils.db().withGlobalTransaction());

	test('it should return the list of statuses for a project', async ({ client }) => {
		const user = await User.create({ username: 'test1234', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });

		const response = await client.get(`/statuses/list/${project.uuid}`).loginAs(user);

		response.assertStatus(200);
		response.assertBody([]);
	});

	test('it should create a new status', async ({ client }) => {
		const user = await User.create({ username: 'test1234', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });

		const baseStatus = {
			name: 'done',
			order: 1,
		};

		const response = await client
			.post('/statuses')
			.json({
				name: baseStatus.name,
				order: baseStatus.order,
				projectId: project.id,
			})
			.loginAs(user);

		response.assertStatus(201);
		response.assertBodyContains({
			name: baseStatus.name,
			order: baseStatus.order,
			projectId: project.id,
		});
	});

	test('it should get a status by id', async ({ client }) => {
		const baseStatus = {
			name: 'done',
			order: 1,
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });
		const status = await Status.create({
			name: baseStatus.name,
			order: baseStatus.order,
			projectId: project.id,
		});

		const getResponse = await client.get(`/statuses/${status.uuid}`).loginAs(user);

		getResponse.assertStatus(200);
		getResponse.assertBodyContains({
			uuid: status.uuid,
			name: baseStatus.name,
			order: baseStatus.order,
			projectId: project.id,
		});
	});

	test('it should update a status', async ({ client }) => {
		const baseStatus = {
			name: 'done',
			order: 1,
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });
		const status = await Status.create({
			name: baseStatus.name,
			order: baseStatus.order,
			projectId: project.id,
		});

		const patchResponse = await client
			.patch(`/statuses/${status.uuid}`)
			.json({
				order: 2,
			})
			.loginAs(user);

		patchResponse.assertStatus(200);
		patchResponse.assertBodyContains({
			uuid: status.uuid,
			name: baseStatus.name,
			order: 2,
			projectId: project.id,
		});
	});

	test('it should delete a todo', async ({ client }) => {
		const baseStatus = {
			name: 'done',
			order: 1,
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });
		const status = await Status.create({
			name: baseStatus.name,
			order: baseStatus.order,
			projectId: project.id,
		});

		const patchResponse = await client.delete(`/statuses/${status.uuid}`).loginAs(user);
		patchResponse.assertStatus(204);
	});
});
