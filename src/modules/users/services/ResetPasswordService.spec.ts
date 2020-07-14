import ResetPasswordService from './ResetPasswordService'

/** Fake Repository */
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'

/** Error */
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let resetPassword: ResetPasswordService

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    )
  })

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    await resetPassword.execute({
      password: '654321',
      token,
    })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(updatedUser?.password).toBe('654321')
  })
})