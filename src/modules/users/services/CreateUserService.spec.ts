import CreateUserService from './CreateUserService'

/** Fake provider */
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

/** Fake repository */
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

/** Shared */
import AppError from '@shared/errors/AppError'

describe('CreateUserService', () => {
  it('should be able a new user', async () => {
    const fakeUsers = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsers, fakeHash)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    return expect(user).toHaveProperty('id')
  })

  it('should not be able to create two users with same email', async () => {
    const fakeUsers = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsers, fakeHash)

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

    await expect(secondUser).rejects.toBeInstanceOf(AppError)
  })
})
