import { test } from '@japa/runner';
import User from '#models/user';

test.group('Authentication',() => {
  test('it should delete the authenticated user account', async ({ client }) => {
    const user = await User.create({ username: 'test1234', password: 'test1234'});
    const response = await client.delete('/account').loginAs(user);

    response.assertStatus(204)
  })
  test('it should not delete an unhotorized user account', async ({ client }) => {
    const response = await client.delete('/account');

    response.assertStatus(401)
  })

})
