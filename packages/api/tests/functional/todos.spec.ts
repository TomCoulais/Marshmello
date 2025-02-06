import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

import Project from '#models/project';
import Status from '#models/status';
import Todo from '#models/todo';
import User from '#models/user';

test.group('Todos', (group) => {
	group.each.setup(() => testUtils.db().withGlobalTransaction());

	test('it should return the list of todos', async ({ client }) => {
		const user = await User.create({ username: 'test1', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });

		const response = await client.get(`/todos/list/${project.uuid}`).loginAs(user);

		response.assertStatus(200);
		response.assertBody([]);
	});

	test('it should create a new todo', async ({ client }) => {
		const baseTodo = {
			name: 'ma première todo',
			description: 'lorem ipsum dolor sit amet.',
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });
		const status = await Status.create({ name: 'done', order: 1, projectId: project.id });

		const response = await client
			.post('/todos')
			.json({
				name: baseTodo.name,
				description: baseTodo.description,
				statusId: status.id,
				projectId: project.id,
			})
			.loginAs(user);

		response.assertStatus(201);
		response.assertBodyContains({
			name: baseTodo.name,
			description: baseTodo.description,
			completed: false,
			projectId: project.id,
			statusId: status.id,
		});
	});

	test('it should get a todo by id', async ({ client }) => {
		const baseTodo = {
			name: 'ma première todo',
			description: 'lorem ipsum dolor sit amet.',
		};

		const user = await User.create({ username: 'test123', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });
		const status = await Status.create({ name: 'done', order: 1, projectId: project.id });
		const todo = await Todo.create({
			name: baseTodo.name,
			description: baseTodo.description,
			projectId: project.id,
			statusId: status.id,
		});

		const getResponse = await client.get(`/todos/${todo.uuid}`).loginAs(user);

		getResponse.assertStatus(200);
		getResponse.assertBodyContains({
			uuid: todo.uuid,
			name: baseTodo.name,
			description: baseTodo.description,
			completed: false,
			projectId: project.id,
			statusId: status.id,
		});
	});

	test('it should update a todo', async ({ client }) => {
		const baseTodo = {
			name: 'ma première todo',
			description: 'lorem ipsum dolor sit amet.',
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });
		const status = await Status.create({ name: 'done', order: 1, projectId: project.id });
		const todo = await Todo.create({
			name: baseTodo.name,
			description: baseTodo.description,
			projectId: project.id,
			statusId: status.id,
		});

		const patchResponse = await client
			.patch(`/todos/${todo.uuid}`)
			.json({
				completed: true,
			})
			.loginAs(user);

		patchResponse.assertStatus(200);
		patchResponse.assertBodyContains({
			uuid: todo.uuid,
			name: baseTodo.name,
			description: baseTodo.description,
			completed: true,
			projectId: project.id,
			statusId: status.id,
		});
	});

	test('it should delete a todo', async ({ client }) => {
		const baseTodo = {
			name: 'ma première todo',
			description: 'lorem ipsum dolor sit amet.',
		};

		const user = await User.create({ username: 'test12345', password: 'test1234' });
		const project = await Project.create({ name: 'mon projet', userId: user.id });
		const status = await Status.create({ name: 'done', order: 1, projectId: project.id });
		const todo = await Todo.create({
			name: baseTodo.name,
			description: baseTodo.description,
			projectId: project.id,
			statusId: status.id,
		});

		const patchResponse = await client.delete(`/todos/${todo.uuid}`).loginAs(user);
		patchResponse.assertStatus(204);
	});
});
