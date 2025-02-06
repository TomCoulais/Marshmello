import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

import Project from '#models/project';
import User from '#models/user';

test.group('Projects', (group) => {
	group.each.setup(() => testUtils.db().withGlobalTransaction());

	test('it should return the list of projects', async ({ client }) => {
		const user = await User.create({ username: 'test25', password: 'test1234' });

		const response = await client.get('/projects').loginAs(user);

		response.assertStatus(200);
		response.assertBody([]);
	});

	test('it should create a new project', async ({ client }) => {
		const user = await User.create({ username: 'test26', password: 'test1234' });
		const projectName = 'mon projet';

		const response = await client
			.post('/projects')
			.json({
				name: projectName,
				userId: user.id,
			})
			.loginAs(user);

		response.assertStatus(201);
		response.assertBodyContains({
			name: projectName,
			userId: user.id,
		});
	});

	test('it should get a project by id', async ({ client }) => {
		const user = await User.create({ username: 'test27', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });

		const getResponse = await client.get(`/projects/${project.uuid}`).loginAs(user);

		getResponse.assertStatus(200);
		getResponse.assertBodyContains({
			uuid: project.uuid,
			name: project.name,
			userId: user.id,
		});
	});

	test('it should update a project', async ({ client }) => {
		const user = await User.create({ username: 'test28', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });

		const newName = 'mon nouveau projet';
		const patchResponse = await client
			.patch(`/projects/${project.uuid}`)
			.json({
				name: newName,
			})
			.loginAs(user);

		patchResponse.assertStatus(200);
		patchResponse.assertBodyContains({
			uuid: project.uuid,
			name: newName,
			userId: user.id,
		});
	});

	test('it should delete a project', async ({ client }) => {
		const user = await User.create({ username: 'test29', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });

		const patchResponse = await client.delete(`/projects/${project.uuid}`).loginAs(user);
		patchResponse.assertStatus(204);
	});
});
