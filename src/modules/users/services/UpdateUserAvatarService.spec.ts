import UpdateUserAvatarService from './UpdateUserAvatarService'

/** Fake provider */
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'

/** Fake Repository */
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

/** Shared */
import AppError from '@shared/errors/AppError'

describe('CreateSessionService', () => {
  it('should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    )

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
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    )

    const update = updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarName: 'avatar.png',
    })

    expect(update).rejects.toBeInstanceOf(AppError)
  })

  it('should be able delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const spyDeleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    )

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
