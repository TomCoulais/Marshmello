import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

import Todo from '#models/todo';

test.group('Tags', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction());
});
