import { injectable, inject } from 'tsyringe'

/* Interface repository */
import IUsersRepository from '../repositories/InterfaceUsersRepository'
import IUserTokensRepository from '../repositories/InterfaceUserTokensRepository'

/** Error */
import AppError from '@shared/errors/AppError'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokens')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exist')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    user.password = password

    await this.usersRepository.save(user)
  }
}

export default ResetPasswordService
