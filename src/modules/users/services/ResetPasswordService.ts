import { injectable, inject } from 'tsyringe'
import { differenceInHours } from 'date-fns'

/* Interface repository */
import IUsersRepository from '../repositories/InterfaceUsersRepository'
import IUserTokensRepository from '../repositories/InterfaceUserTokensRepository'

/** Providers */
import IHashProvider from '../providers/HashProvider/models/InterfaceHashProvider'

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

    @inject('HashProvider')
    private hashProvider: IHashProvider,
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

    const tokenCreatedAt = new Date(userToken.created_at)

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.save(user)
  }
}

export default ResetPasswordService
