import { Request, Response } from 'express'
import { parseISO } from 'date-fns'
import { container } from 'tsyringe'

/* Services */
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body

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
      date,
    })

    return res.json(appointment)
  }
}

export default AppointmentsController
