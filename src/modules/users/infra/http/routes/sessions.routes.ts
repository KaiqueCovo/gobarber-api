import { Router } from 'express'

/* Repositories */
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

/* Services */
import CreateSessionService from '@modules/users/services/CreateSessionService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  /**
   * Service session instance
   */
  const usersRepository = new UsersRepository()
  const createSession = new CreateSessionService(usersRepository)

  /**
   * Execute method for create session
   */
  const { user, token } = await createSession.execute({ email, password })

  delete user.password
  return res.json({ user, token })
})

export default sessionsRouter
