import { Request, Response } from 'express'
import { container } from 'tsyringe'

/* Services */
import CreateUserService from '@modules/users/services/CreateUserService'

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    /**
     * Service user instance
     */
    const createUser = container.resolve(CreateUserService)

    /**
     * Execute method for create user
     */
    const user = await createUser.execute({ name, email, password })

    return res.json(user)
  }
}

export default UsersController
