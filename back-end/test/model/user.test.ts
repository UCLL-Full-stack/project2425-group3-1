import { User } from "../../model/user";
import { Role } from '../../types';

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
  // given
  const username = 'axl123';
  const firstName = 'Axl';
  const lastName = 'Loisen';
  const email = 'axl@example.com';
  const password = 'nuyensFleur123';
  const role: Role = 'user'; 

  // when
  const user = new User({
    username,
    firstName,
    lastName,
    email,
    password,
    role,
  });

  // then
  expect(user.getUsername()).toEqual(username);
  expect(user.getFirstName()).toEqual(firstName);
  expect(user.getLastName()).toEqual(lastName);
  expect(user.getEmail()).toEqual(email);
  expect(user.getPassword()).toEqual(password);
  expect(user.getRole()).toEqual(role);
});


test('given: missing required fields, when: user is created, then: an error is thrown', () => {
  // given
  const username = ''; 
  const firstName = 'Axl';
  const lastName = 'Loisen';
  const email = 'axl@example.com';
  const password = 'nuyensFleur123';
  const role: Role = 'user'; 

  // when & then
  expect(() => {
    new User({
      username,
      firstName,
      lastName,
      email,
      password,
      role,
    });
  }).toThrowError('Username is required'); 


  const invalidUser = {
    username: 'axl123',
    firstName: '',
    lastName: 'Loisen',
    email: 'axl@example.com',
    password: 'nuyensFleur123',
    role: role, 
  };

  expect(() => {
    new User(invalidUser);
  }).toThrowError('First name is required'); 
});