import { Router } from 'express'

/* Middlewares */
import AuthMiddleware from '@modules/users/infra/http/middlewares/AuthMiddleware'

/* Controllers */
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(AuthMiddleware)

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
