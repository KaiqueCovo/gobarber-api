import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import AppError from '../errors/AppError'

import User from '../models/User'

interface RequestDTO {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    /**
     * Get methods Repository
     */
    const usersRepository = getRepository(User)

    /**
     * Get user with this email
     */
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    })

    /**
     * Check if exists user with this email
     */
    if (checkUserExists) {
      throw new AppError('This user already exists', 403)
    }

    const passwordHashed = await hash(password, 8)

    /**
     * Create user instance
     */
    const user = usersRepository.create({
      name,
      email,
      password: passwordHashed,
    })

    /**
     * Save instance in database
     */
    await usersRepository.save(user)

    delete user.password

    return user
  }
}

export default CreateUserService
