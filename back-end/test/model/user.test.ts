import { User } from "../../model/user";

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
  // given
  const name = 'Axl Loisen';
  const password = 'nuyensFleur123';

  // when
  const user = new User({name, password});

  // then
  expect(user.getName()).toEqual(name);
  expect(user.getPassword()).toEqual(password);
});