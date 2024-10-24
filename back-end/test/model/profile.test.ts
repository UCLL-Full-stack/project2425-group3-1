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