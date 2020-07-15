import { injectable, inject } from 'tsyringe'

/* Interface repository */
import IUsersRepository from '../repositories/InterfaceUsersRepository'
import IUserTokensRepository from '../repositories/InterfaceUserTokensRepository'

/* Providers */
import IMailProvider from '@shared/container/providers/MailProvider/models/InterfaceMailProvider'

/** Error */
import AppError from '@shared/errors/AppError'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokens')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    /**
     * Get user with email
     */
    const user = await this.usersRepository.findByEmail(email)

    /**
     * Check if user exists
     */
    if (!user) {
      throw new AppError('This user does not exist')
    }

    /**
     * Send
     */
    const { token } = await this.userTokensRepository.generate(user.id)

    await this.mailProvider.sendMail(email, `Recuperação de senha: ${token}`)
  }
}

export default SendForgotPasswordEmailService
