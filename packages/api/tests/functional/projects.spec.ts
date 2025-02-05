import User from '#models/user';
import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

test.group('Projects',(group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction());
  test('it should return the list projects', async ({ client }) => {
    const user = await User.create({ username: 'test1234', password: 'test1234'});
    const response = await client.get('/projects').loginAs(user);

    response.assertStatus(200);
    response.assertBody([]);
  });

  test('it should create the list project', async ({ client }) => {
    const projectName = 'ma première project';
    const user = await User.create({ username: 'test1234', password: 'test1234'});
    const response = await client.post('/projects').json({
      name: projectName,
      userId: user.id
    }).loginAs(user);

    response.assertStatus(201);

    response.assertBodyContains({
      name: projectName,
      userId: user.id
    });
  });
  test('it should get the list project', async ({ client }) => {
    const projectName = 'ma première project';
    const user = await User.create({ username: 'test1234', password: 'test1234'});
    const response = await client.post('/projects').json({
      name: projectName,
      userId: user.id
    }).loginAs(user);

    const projectId = (response.response.body as { uuid: string }).uuid;
    const getResponse = await client.get(`/projects/${projectId}`).loginAs(user);

    getResponse.assertStatus(200);

    getResponse.assertBodyContains({
      uuid: projectId,
      name: projectName,
      userId: user.id
    });
  });
  test('it should update a project', async ({ client }) => {
    const user = await User.create({ username: 'test1234', password: 'test1234'});
    const projectName = "ma jolie project";
    const createResponse = await client.post('/projects').json({
      name: projectName,
      userId: user.id,
    }).loginAs(user);
    const projectId = (createResponse.response.body as { uuid: string }).uuid;
    const getResponse = await client.get(`/projects/${projectId}`).loginAs(user);

    getResponse.assertStatus(200);
    getResponse.assertBodyContains({
      name: projectName,
      userId: user.id,
    })
  });
  test('it should delete a project', async ({ client }) => {
    const user = await User.create({ username: 'test1234', password: 'test1234'});
    const projectName = "ma jolie project";
    const createResponse = await client.post('/projects').json({
      name: projectName,
      userId: user.id,
    }).loginAs(user);

    const projectId = (createResponse.response.body as { uuid: string }).uuid;
    const patchResponse = await client.delete(`/projects/${projectId}`).loginAs(user);

    patchResponse.assertStatus(204);

  });

});
