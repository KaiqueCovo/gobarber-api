import CreateSessionService from './CreateSessionService'
import CreateUserService from './CreateUserService'

/** Fake provider */
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

/** Fake Repository */
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

/** Shared */
import AppError from '@shared/errors/AppError'

describe('CreateSessionService', () => {
  it('should be able to authenticate', async () => {
    const fakeUsers = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsers, fakeHash)
    const createSession = new CreateSessionService(fakeUsers, fakeHash)

    const user = await createUser.execute({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const userAuthenticated = await createSession.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(userAuthenticated).toHaveProperty('token')
    expect(userAuthenticated.user).toEqual(user)
  })

  it('should not be able to authenticate email that does not exists', async () => {
    const fakeUsers = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()

    const createSession = new CreateSessionService(fakeUsers, fakeHash)

    const user = createSession.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(user).rejects.toBeInstanceOf(AppError)
  })

  it('it should not be able to authenticate user with wrong password', async () => {
    const fakeUsers = new FakeUsersRepository()
    const fakeHash = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsers, fakeHash)
    const createSession = new CreateSessionService(fakeUsers, fakeHash)

    await createUser.execute({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const userWithWrongPassword = createSession.execute({
      email: 'johndoe@example.com',
      password: 'wrongPassword',
    })

    await expect(userWithWrongPassword).rejects.toBeInstanceOf(AppError)
  })
})
