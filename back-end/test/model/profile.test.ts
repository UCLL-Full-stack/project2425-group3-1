import { Profile } from "../../model/profile";

test('given: valid values for profile, when: profile is created, then: profile is created with those values', () => {
  // given
  const lastName = 'Nuyens';
  const firstName = 'Fleur';
  const email = 'LoisenAxl@ucll.be';

  // when
  const profile = new Profile({ lastName, firstName, email });

  // then
  expect(profile.getLastName()).toEqual(lastName);
  expect(profile.getFirstName()).toEqual(firstName);
  expect(profile.getEmail()).toEqual(email);
});

test('given: missing last name, when: profile is created, then: an error is thrown', () => {
  // given
  const lastName = ''; 
  const firstName = 'Fleur';
  const email = 'LoisenAxl@ucll.be';

  // when & then
  expect(() => {
    new Profile({ lastName, firstName, email });
  }).toThrowError('Last name is required and cannot be empty.'); 
});

test('given: missing first name, when: profile is created, then: an error is thrown', () => {
  // given
  const lastName = 'Nuyens';
  const firstName = ''; 
  const email = 'LoisenAxl@ucll.be';

  // when & then
  expect(() => {
    new Profile({ lastName, firstName, email });
  }).toThrowError('First name is required and cannot be empty.'); 
});

test('given: missing email, when: profile is created, then: an error is thrown', () => {
  // given
  const lastName = 'Nuyens';
  const firstName = 'Fleur';
  const email = ''; 

  // when & then
  expect(() => {
    new Profile({ lastName, firstName, email });
  }).toThrowError('Email is required and cannot be empty.'); 
});
