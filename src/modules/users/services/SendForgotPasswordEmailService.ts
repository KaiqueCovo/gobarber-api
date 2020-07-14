import { injectable, inject } from 'tsyringe'

/* Interface repository */
import IUsersRepository from '../repositories/InterfaceUsersRepository'

/* Providers */
import IMailProvider from '@shared/container/providers/MailProvider/models/InterfaceMailProvider'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(email, 'Recuperação de senha')
  }
}

export default SendForgotPasswordEmailService
