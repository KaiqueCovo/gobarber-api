import ResetPasswordService from './ResetPasswordService'

/** Fake Repository */
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'

/** Fake Provider */
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

/** Error */
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeHashProvider: FakeHashProvider
let resetPassword: ResetPasswordService

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    )
  })

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    const spyGenerateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPassword.execute({
      password: '654321',
      token,
    })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(spyGenerateHash).toBeCalledWith('654321')
    expect(updatedUser?.password).toBe('654321')
  })

  it('should not be able to reset the password with non-existing token', async () => {
    const tryResetPassword = resetPassword.execute({
      password: '123456',
      token: 'non-existing-token',
    })

    await expect(tryResetPassword).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to serest the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    )

    const tryResetPassword = resetPassword.execute({
      password: '123456',
      token,
    })

    await expect(tryResetPassword).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    const tryResetPasswordWithTokenExpired = resetPassword.execute({
      password: '654321',
      token,
    })

    await expect(tryResetPasswordWithTokenExpired).rejects.toBeInstanceOf(
      AppError,
    )
  })
})
