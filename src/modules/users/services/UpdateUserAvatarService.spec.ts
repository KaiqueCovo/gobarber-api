import UpdateUserAvatarService from './UpdateUserAvatarService'

/** Fake provider */
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'

/** Fake Repository */
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

/** Shared */
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatar: UpdateUserAvatarService

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    )
  })
  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarName: 'avatar.png',
    })

    expect(user.avatar).toBe('avatar.png')
  })

  it('should not be able to update user avatar without authenticated', async () => {
    const update = updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarName: 'avatar.png',
    })

    await expect(update).rejects.toBeInstanceOf(AppError)
  })

  it('should be able delete old avatar when updating new one', async () => {
    const spyDeleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarName: 'old-avatar.png',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarName: 'new-avatar.png',
    })

    expect(spyDeleteFile).toHaveBeenCalledWith('old-avatar.png')
    expect(user.avatar).toBe('new-avatar.png')
  })
})
