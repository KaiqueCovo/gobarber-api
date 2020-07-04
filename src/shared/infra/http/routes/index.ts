import { Router } from 'express'

/* Users */
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'

/* Appointments */
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes'

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)

export default routes
