import { Router } from 'express'

import CreateSessionService from '../services/CreateSessionService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  /**
   * Service session instance
   */
  const createSession = new CreateSessionService()

  /**
   * Execute method for create session
   */
  const { user, token } = await createSession.execute({ email, password })

  delete user.password
  return res.json({ user, token })
})

export default sessionsRouter
