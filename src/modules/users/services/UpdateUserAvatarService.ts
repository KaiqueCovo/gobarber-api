import { injectable, inject } from 'tsyringe'

/* Entities */
import User from '../infra/typeorm/entities/User'

/* Interface repository */
import IUsersRepository from '../repositories/InterfaceUsersRepository'

/* Providers */
import IStorageProvider from '@shared/container/providers/StorageProvider/models/InterfaceStorageProvider'

/* Shared */
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  avatarName: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

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
      await this.storageProvider.deleteFile(user.avatar)
    }

    await this.storageProvider.saveFile(avatarName)

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
