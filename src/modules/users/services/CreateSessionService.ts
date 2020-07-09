import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

/* Entities */
import User from '../infra/typeorm/entities/User'

/* Interface repository */
import IUsersRepository from '../repositories/InterfaceUsersRepository'

/** Providers */
import IHashProvider from '../providers/HashProvider/models/InterfaceHashProvider'

/* Shared */
import AppError from '@shared/errors/AppError'

/* Configs */
import authConfig from '@configs/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    /**
     * Get user with this email
     */
    const user = await this.usersRepository.findByEmail(email)

    /**
     * Check if exists user with this email
     */
    if (!user) {
      throw new AppError('Incorrect Email/Password combination', 401)
    }

    /**
     * Check password with password hash
     */
    const checkPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    /**
     * Check if password is correct
     */
    if (!checkPassword) {
      throw new AppError('Incorrect Email/Password combination', 401)
    }

    /**
     * Generate Json Web Token
     */

    const { secret, expiresIn } = authConfig

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}

export default CreateSessionService
