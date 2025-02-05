import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

import User from '#models/user';

test.group('Todos', (group) => {
	group.each.setup(() => testUtils.db().withGlobalTransaction());

	test('it should return the list of todos', async ({ client }) => {
		const user = await User.create({ username: 'test1234', password: 'test1234' });

		const projectName = 'mon projet';
		const projectResponse = await client
			.post('/projects')
			.json({ name: projectName })
			.loginAs(user);
		const projectUuid = (projectResponse.response.body as { uuid: string }).uuid;

		const response = await client.get(`/todos/${projectUuid}`);

		response.assertStatus(200);
		response.assertBody([]);
	});

	test('it should create a new todo', async ({ client }) => {
		const baseTodo = {
			name: 'ma première todo',
			description: 'lorem ipsum dolor sit amet.',
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });

		const projectName = 'mon projet';
		const projectResponse = await client
			.post('/projects')
			.json({ name: projectName })
			.loginAs(user);
		const projectId = (projectResponse.response.body as { id: number }).id;

		const statusName = 'done';
		const statusResponse = await client
			.post('/statuses')
			.json({
				name: statusName,
				projectId,
			})
			.loginAs(user);
		const statusId = (statusResponse.response.body as { id: number }).id;

		const response = await client.post('/todos').json({
			name: baseTodo.name,
			description: baseTodo.description,
			statusId,
			projectId,
		});

		response.assertStatus(201);
		response.assertBodyContains({
			name: baseTodo.name,
			description: baseTodo.description,
			completed: false,
			projectId,
			statusId,
		});
	});

	test('it should get a todo by id', async ({ client }) => {
		const baseTodo = {
			name: 'ma première todo',
			description: 'lorem ipsum dolor sit amet.',
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });

		const projectName = 'mon projet';
		const projectResponse = await client
			.post('/projects')
			.json({ name: projectName })
			.loginAs(user);
		const projectId = (projectResponse.response.body as { id: number }).id;

		const statusName = 'done';
		const statusResponse = await client
			.post('/statuses')
			.json({
				name: statusName,
				projectId,
			})
			.loginAs(user);
		const statusId = (statusResponse.response.body as { id: number }).id;

		const createResponse = await client.post('/todos').json({
			name: baseTodo.name,
			description: baseTodo.description,
			statusId,
			projectId,
		});

		const todoUuid = (createResponse.response.body as { uuid: string }).uuid;

		const getResponse = await client.get(`/todos/${todoUuid}`);

		getResponse.assertStatus(200);
		getResponse.assertBodyContains({
			uuid: todoUuid,
			name: baseTodo.name,
			description: baseTodo.description,
			completed: false,
			projectId,
			statusId,
		});
	});

	test('it should update a todo', async ({ client }) => {
		const baseTodo = {
			name: 'ma première todo',
			description: 'lorem ipsum dolor sit amet.',
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });

		const projectName = 'mon projet';
		const projectResponse = await client
			.post('/projects')
			.json({ name: projectName })
			.loginAs(user);
		const projectId = (projectResponse.response.body as { id: number }).id;

		const statusName = 'done';
		const statusResponse = await client
			.post('/statuses')
			.json({
				name: statusName,
				projectId,
			})
			.loginAs(user);
		const statusId = (statusResponse.response.body as { id: number }).id;

		const createResponse = await client.post('/todos').json({
			name: baseTodo.name,
			description: baseTodo.description,
			statusId,
			projectId,
		});

		const todoUuid = (createResponse.response.body as { uuid: string }).uuid;

		const patchResponse = await client.patch(`/todos/${todoUuid}`).json({
			completed: true,
		});

		patchResponse.assertStatus(200);
		patchResponse.assertBodyContains({
			uuid: todoUuid,
			name: baseTodo.name,
			description: baseTodo.description,
			completed: true,
			projectId,
			statusId,
		});
	});

	test('it should delete a todo', async ({ client }) => {
		const baseTodo = {
			name: 'ma première todo',
			description: 'lorem ipsum dolor sit amet.',
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });

		const projectName = 'mon projet';
		const projectResponse = await client
			.post('/projects')
			.json({ name: projectName })
			.loginAs(user);
		const projectId = (projectResponse.response.body as { id: number }).id;

		const statusName = 'done';
		const statusResponse = await client
			.post('/statuses')
			.json({
				name: statusName,
				projectId,
			})
			.loginAs(user);
		const statusId = (statusResponse.response.body as { id: number }).id;

		const createResponse = await client.post('/todos').json({
			name: baseTodo.name,
			description: baseTodo.description,
			statusId,
			projectId,
		});

		const todoUuid = (createResponse.response.body as { uuid: string }).uuid;

		const patchResponse = await client.delete(`/todos/${todoUuid}`);
		patchResponse.assertStatus(204);
	});
});
