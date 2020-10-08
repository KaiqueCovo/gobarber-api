import CreateSessionService from './CreateSessionService'

/** Fake provider */
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

/** Fake Repository */
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

/** Shared */
import AppError from '@shared/errors/AppError'

let fakeUsers: FakeUsersRepository
let fakeHash: FakeHashProvider

let createSession: CreateSessionService

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeUsers = new FakeUsersRepository()
    fakeHash = new FakeHashProvider()

    createSession = new CreateSessionService(fakeUsers, fakeHash)
  })

  it('should be able to authenticate', async () => {
    const user = await fakeUsers.create({
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
    const user = createSession.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(user).rejects.toBeInstanceOf(AppError)
  })

  it('it should not be able to authenticate user with wrong password', async () => {
    await fakeUsers.create({
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
