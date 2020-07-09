import CreateUserService from './CreateUserService'

/** Fake repository */
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

/** Shared */
import AppError from '@shared/errors/AppError'

describe('CreateUserService', () => {
  it('should be able a new user', async () => {
    const fakeUsers = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsers)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    return expect(user).toHaveProperty('id')
  })

  it('should not be able to create two users with same email', async () => {
    const fakeUsers = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsers)

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const secondUser = createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(secondUser).rejects.toBeInstanceOf(AppError)
  })
})