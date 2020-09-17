import { injectable, inject } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/InterfaceCacheProvider'

/* Entities */
import User from '@modules/users/infra/typeorm/entities/User'

/* Interface repository */
import IUsersRepository from '@modules/users/repositories/InterfaceUsersRepository'

interface IRequest {
  user_id: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    )

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      })

      console.log('teste')

      await this.cacheProvider.save(`providers-list:${user_id}`, users)
    }

    return users
  }
}

export default ListProvidersService
