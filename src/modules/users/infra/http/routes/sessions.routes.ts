import { Router } from 'express'
import { container } from 'tsyringe'

/* Services */
import CreateSessionService from '@modules/users/services/CreateSessionService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (req, res) => {
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
})

export default sessionsRouter
