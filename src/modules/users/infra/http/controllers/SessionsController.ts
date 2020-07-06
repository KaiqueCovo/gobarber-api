import { Request, Response } from 'express'
import { container } from 'tsyringe'

/* Services */
import CreateSessionService from '@modules/users/services/CreateSessionService'

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    /**
     * Service session instance
     */
    const createSession = container.resolve(CreateSessionService)

    /**
     * Execute method for create session
     */
    const { user, token } = await createSession.execute({ email, password })

    delete user.password
    return res.json({ user, token })
  }
}

export default SessionsController
