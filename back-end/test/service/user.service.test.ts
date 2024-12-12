import userService from '../../service/user.service';
import userDB from '../../repository/user.db';
import bcrypt from 'bcrypt';
import { User } from '../../model/user';
import { generateJwtToken } from '../../util/jwt';
import { UserInput } from '../../types'; 

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
    hash: jest.fn().mockResolvedValue('hashedpassword123'), 
  }));
jest.mock('../../repository/user.db');
jest.mock('../../util/jwt');

let mockGetUserByUsername: jest.Mock;
let mockGetAllUsers: jest.Mock;
let mockCreateUser: jest.Mock;
let mockGenerateJwtToken: jest.Mock;

beforeEach(() => {
  mockGetUserByUsername = userDB.getUserByUsername as jest.Mock;
  mockGetAllUsers = userDB.getAllUsers as jest.Mock;
  mockCreateUser = userDB.createUser as jest.Mock;
  mockGenerateJwtToken = generateJwtToken as jest.Mock;
});


afterEach(() => {
  jest.clearAllMocks();
});

test('given: users exist in database, when: getAllUsers is called, then: all users are returned', async () => {
  // Given
  const user = new User({
    username: 'fleuraxl',
    password: 'hashedpassword',
    firstName: 'fleuraxl',
    lastName: 'axlfleur',
    email: 'fleur.axl@example.com',
    role: 'user',  
  });
  mockGetAllUsers.mockResolvedValue([user]);

  // When
  const result = await userService.getAllUsers();

  // Then
  expect(result).toEqual([user]);
  expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
});

test('given: user does not exist, when: getUserByUsername is called, then: throw error', async () => {
  // Given
  mockGetUserByUsername.mockResolvedValue(null);

  // When & Then
  await expect(userService.getUserByUsername({ username: 'nonexistentuser' }))
    .rejects
    .toThrowError('User with username: nonexistentuser does not exist.');
  expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
});

test('given: username already exists, when: createUser is called, then: throw error', async () => {
  // Given
  const userInput: UserInput = {
    username: 'testuser',
    password: 'password123',
    firstName: 'Axl',
    lastName: 'Doe',
    email: 'Axl.doe@example.com',
    role: 'user',  
  };
  mockGetUserByUsername.mockResolvedValue(true);

  // When & Then
  await expect(userService.createUser(userInput))
    .rejects
    .toThrowError('User with username testuser is already registered.');
  expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
});


test('given: valid user input, when: createUser is called, then: user is created successfully', async () => {
    // Given
    const userInput: UserInput = {
      username: 'newuser',
      password: 'password123',
      firstName: 'fleur.',
      lastName: 'Doe',
      email: 'fleur.doe@example.com',
      role: 'admin',
    };
  
    const hashedPassword = 'hashedpassword123'; 
  
    const user = new User({
      username: 'newuser',
      password: hashedPassword,
      firstName: 'fleur.',
      lastName: 'Doe',
      email: 'fleur.doe@example.com',
      role: 'admin',
    });
  
   
    mockGetUserByUsername.mockResolvedValue(null);
    mockCreateUser.mockResolvedValue(user);
  
    // When
    const result = await userService.createUser(userInput);
  
    // Then
    expect(result).toEqual(user);
    expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledTimes(1); 
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
});