import { hash } from 'bcryptjs'
import { injectable, inject } from 'tsyringe'

/* Entities */
import User from '../infra/typeorm/entities/User'

/* Interface repository */
import IUsersRepository from '../repositories/InterfaceUsersRepository'

/* Shared */
import AppError from '@shared/errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    /**
     * Get user with this email
     */
    const checkUserExists = await this.usersRepository.findByEmail(email)

    /**
     * Check if exists user with this email
     */
    if (checkUserExists) {
      throw new AppError('This user already exists', 403)
    }

    /**
     * Encrypt password
     */
    const passwordHashed = await hash(password, 8)

    /**
     * Create user instance
     */
    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
    })

    delete user.password

    return user
  }
}

export default CreateUserService
