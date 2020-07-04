import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import AppError from '../errors/AppError'

import authConfig from '../configs/auth'

import User from '../models/User'

interface RequestDTO {
  email: string
  password: string
}

interface ResponseDTO {
  user: User
  token: string
}

class CreateSessionService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    /**
     * Get methods from repository Appointment
     */
    const usersRepository = getRepository(User)

    /**
     * Get user with this email
     */
    const user = await usersRepository.findOne({ where: { email } })

    /**
     * Check if exists user with this email
     */
    if (!user) {
      throw new AppError('Incorrect Email/Password combination', 401)
    }

    /**
     * Check password with password hash
     */
    const checkPassword = await compare(password, user.password)

    /**
     * Cehck if password is correct
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
