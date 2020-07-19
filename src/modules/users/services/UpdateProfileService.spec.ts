import UpdateProfileService from './UpdateProfileService'

/** Fake provider */
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

/** Fake repository */
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

/** Shared */
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfileService: UpdateProfileService

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    )
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
    })

    expect(updateUser.name).toBe('John Tre')
    expect(updateUser.email).toBe('johntre@example.com')
  })

  it('should be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'First User',
      email: 'firstuser@example.com',
      password: 'firstuser',
    })

    const user = await fakeUsersRepository.create({
      name: 'Second User',
      email: 'seconduser@example.com',
      password: 'seconduser',
    })

    const updateUser = updateProfileService.execute({
      user_id: user.id,
      name: user.name,
      email: 'firstuser@example.com',
    })

    await expect(updateUser).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '1234567',
    })

    expect(updateUser.password).toBe('1234567')
  })

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const updateUser = updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '1234567',
    })

    await expect(updateUser).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const updateUser = updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      old_password: 'wrong-old_password',
      password: '1234567',
    })

    await expect(updateUser).rejects.toBeInstanceOf(AppError)
  })
})
