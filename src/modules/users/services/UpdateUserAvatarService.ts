import { resolve } from 'path'
import fs from 'fs'

/* Entities */
import User from '../infra/typeorm/entities/User'

/* Interface repository */
import IUsersRepository from '../repositories/InterfaceUsersRepository'

/* Shared */
import AppError from '@shared/errors/AppError'

/* Configs */
import { directory } from '@configs/upload'

interface IRequest {
  user_id: string
  avatarName: string
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarName }: IRequest): Promise<User> {
    /**
     * Get user with ID
     */
    const user = await this.usersRepository.findById(user_id)

    /**
     * Check if user exists
     */
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      /**
       * Get image avatar
       */
      const userAvatarFilePath = resolve(directory, user.avatar)

      /**
       * Return image data
       */
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      /**
       * Delete avatar
       */
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    /**
     * Change avatar
     */
    user.avatar = avatarName

    /**
     * Update avatar
     */
    await this.usersRepository.save(user)

    delete user.password

    return user
  }
}

export default UpdateUserAvatarService
