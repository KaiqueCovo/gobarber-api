import { Request, Response } from 'express'
import { container } from 'tsyringe'

/* Services */
import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService'

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService)

    const user = await showProfile.execute({ user_id: req.user.id })

    delete user.password

    return res.json(user)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id
    const { name, email, old_password, password } = req.body

    const updateProfile = container.resolve(UpdateProfileService)

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    })

    delete user.password

    return res.json(user)
  }
}

export default ProfileController