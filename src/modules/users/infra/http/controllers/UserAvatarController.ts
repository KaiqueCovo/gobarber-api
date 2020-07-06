import { Request, Response } from 'express'
import { container } from 'tsyringe'

/* Services */
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { filename } = req.file
    const { id } = req.user

    /**
     * Service update avatar instance
     */
    const updateAvatar = container.resolve(UpdateUserAvatarService)

    /**
     * Execute method for update avatar
     */
    const user = await updateAvatar.execute({
      user_id: id,
      avatarName: filename,
    })

    return res.json(user)
  }
}

export default UserAvatarController
