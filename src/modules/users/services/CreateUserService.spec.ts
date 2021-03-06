import CreateUserService from './CreateUserService'

/** Fake provider */
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

/** Fake repository */
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

/** Shared */
import AppError from '@shared/errors/AppError'

let fakeUsers: FakeUsersRepository
let fakeHash: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider
let createUser: CreateUserService

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsers = new FakeUsersRepository()
    fakeHash = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()
    createUser = new CreateUserService(fakeUsers, fakeHash, fakeCacheProvider)
  })

  it('should be able a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    return expect(user).toHaveProperty('id')
  })

  it('should not be able to create two users with same email', async () => {
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
