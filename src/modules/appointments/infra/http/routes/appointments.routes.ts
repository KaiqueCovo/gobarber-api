import { Router } from 'express'
import { parseISO } from 'date-fns'

/* Middlewares */
import AuthMiddleware from '@modules/users/infra/http/middlewares/AuthMiddleware'

/* Repositories */
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

/* Services */
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

const appointmentRouter = Router()

appointmentRouter.use(AuthMiddleware)

/* appointmentRouter.get('/', async (req, res) => {
  const appointments = await appointmentRepository.find()

  return res.json(appointments)
})
*/

appointmentRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body

  /**
   * Convert date string in Date()
   */
  const parsedDate = parseISO(date)

  /**
   * Service instance
   */
  const appointmentsRepository = new AppointmentRepository()
  const createAppointment = new CreateAppointmentService(appointmentsRepository)

  /**
   * Execute method for create appointment
   */
  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  })

  return res.json(appointment)
})

export default appointmentRouter
