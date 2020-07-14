import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

/** Fake provider */
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

/** Fake Repository */
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

/** Error */
import AppError from '@shared/errors/AppError'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeMailProvider: FakeMailProvider
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeMailProvider = new FakeMailProvider()

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    )
  })

  it('should be able to recover the password using the email', async () => {
    const spySendEmail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })

    expect(spySendEmail).toHaveBeenCalled()
  })

  it('should not be able to recover a non-existing user password', async () => {
    const sendMail = sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })

    await expect(sendMail).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgot password token', async () => {
    const spyGenerateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })

    expect(spyGenerateToken).toHaveBeenCalledWith(user.id)
  })
})
