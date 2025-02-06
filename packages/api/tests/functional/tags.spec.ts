import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

import Todo from '#models/todo';
import Tag from '#models/tag';
import User from '#models/user';
import Project from '#models/project';
import Status from '#models/status';


test.group('Tags', (group) => {
	group.each.setup(() => testUtils.db().withGlobalTransaction());


  test('it should return the list of tags', async ({ client }) => {
		const user = await User.create({ username: 'testTag', password: 'test1234' });

		const response = await client.get(`/tags`).loginAs(user);

		response.assertStatus(200);
		response.assertBody([]);
	});

  test('it should return a tag by UUID', async ({ client }) => {
    const user = await User.create({ username: 'testTag1', password: 'test1234' });
    const baseTodo = {
      name: 'ma première todo',
      description: 'lorem ipsum dolor sit amet.',
    };
    const project = await Project.create({ name: 'mon projet', userId: user.id });
    const status = await Status.create({ name: 'done', order: 1, projectId: project.id });
    const todo = await Todo.create({
          name: baseTodo.name,
          description: baseTodo.description,
          projectId: project.id,
          statusId: status.id,
        });

    const tag = await Tag.create({ name: 'Urgent', todoId: todo.id });

    const response = await client.get(`/tags/${tag.uuid}`).loginAs(user);

    response.assertStatus(200);
    response.assertBodyContains({
        uuid: tag.uuid,
        name: 'Urgent'
    });
  });

  test('it should create a new tag', async ({ client }) => {
      const baseTag = {
        name: 'mon premier tag',
      };

      const user = await User.create({ username: 'testTag2', password: 'test1234' });

      const response = await client
        .post('/tags')
        .json({
          name: baseTag.name,
        })
        .loginAs(user);

      response.assertStatus(201);
      response.assertBodyContains({
        name: baseTag.name,
      });
  });

  test('it should update a tag', async ({ client }) => {
    const baseTag = {
      name: 'mon premier tag',
    };

    const user = await User.create({ username: 'testTag3', password: 'test1234' });

    const tag = await Tag.create({ name: baseTag.name });

    const updatedTag = {
      name: 'mon tag mis à jour',
    };


    const patchResponse = await client
      .put(`/tags/${tag.uuid}`)
      .json(updatedTag)
      .loginAs(user);

    patchResponse.assertStatus(200);


    patchResponse.assertBodyContains({
      uuid: tag.uuid,
      name: updatedTag.name,
    });
  });

  test('it should delete a tag', async ({ client }) => {
    const baseTag = {
      name: 'mon premier tag',
    };

    const user = await User.create({ username: 'testTag4', password: 'test1234' });
    const tag = await Tag.create({
      name: baseTag.name,
    });

    const patchResponse = await client.delete(`/tags/${tag.uuid}`).loginAs(user);
    patchResponse.assertStatus(204);
  });


});


