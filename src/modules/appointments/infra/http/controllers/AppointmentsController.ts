import { Request, Response } from 'express'
import { parseISO } from 'date-fns'
import { container } from 'tsyringe'

/* Services */
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body

    /**
     * Convert date string in Date()
     */
    const parsedDate = parseISO(date)

    /**
     * Service instance
     */
    const createAppointment = container.resolve(CreateAppointmentService)

    /**
     * Execute method for create appointment
     */
    const appointment = await createAppointment.execute({
      provider_id,
      user_id: req.user.id,
      date: parsedDate,
    })

    return res.json(appointment)
  }
}

export default AppointmentsController
