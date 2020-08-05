import { Router } from 'express'

/* Middlewares */
import AuthMiddleware from '@modules/users/infra/http/middlewares/AuthMiddleware'

/* Controllers */
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'

const providersRouter = Router()
const providersController = new ProvidersController()

providersRouter.use(AuthMiddleware)

providersRouter.get('/', providersController.index)

export default providersRouter
