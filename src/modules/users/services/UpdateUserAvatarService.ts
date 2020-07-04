import { getRepository } from 'typeorm'
import { resolve } from 'path'
import fs from 'fs'

import AppError from '../errors/AppError'

import { directory } from '../configs/upload'

import User from '../models/User'

interface RequestDTO {
  user_id: string
  avatarName: string
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarName }: RequestDTO): Promise<User> {
    /**
     * Get methods Repository
     */
    const usersRepository = getRepository(User)

    /**
     * Get user with id
     */
    const user = await usersRepository.findOne(user_id)

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
    await usersRepository.save(user)

    delete user.password

    return user
  }
}

export default UpdateUserAvatarService
