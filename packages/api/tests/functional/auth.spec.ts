import { test } from '@japa/runner';
import User from '#models/user';

test.group('Authentication',() => {
    test('it should not login when invaid credentials', async ({ client }) =>{
      const response = await client.post('/auth/login').json({
        username: 'bad_username',
        password: 'password'
      })

      response.assertStatus(400);
    });

    test('it should login when valid credentials', async ({ client }) =>{
      const username = 'good_username';
      const response = await client.post('/auth/login').json({
        username,
        password: 'password'
      })

      response.assertStatus(200);
      response.assertBodyContains({ username });
    });

    test('it should not logout whien user is disconnected', async ({ client }) =>{
      const response = await client.post('/auth/logout');
      response.assertStatus(401)
    });

    test('it should logout when user is connected', async ({ client }) =>{
      const user = await User.create({ username: 'test1234', password: 'test1234'});

      const response = await client.post('/auth/logout').loginAs(user);

      response.assertStatus(204)
    });

    test('it should not register when a username is taken', async ({ client }) =>{
      const username = 'good_username'
      const response = await client.post('/auth/register').json({
        username,
        password: 'password',
      })

      response.assertStatus(422)
    });

    test('it should register when username is available', async ({ client }) =>{
      const username = 'available_username'
      const response = await client.post('/auth/register').json({
        username,
        password: 'password',
      })

      response.assertStatus(201)
    });
  })
