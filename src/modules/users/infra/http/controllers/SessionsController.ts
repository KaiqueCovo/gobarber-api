import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

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

    return res.json({ user: classToClass(user), token })
  }
}

export default SessionsController
