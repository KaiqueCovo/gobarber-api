import { Request, Response } from 'express'
import { container } from 'tsyringe'

/* Services */
import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService'

class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id

    const { day, month, year } = req.body

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentService,
    )

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    })

    return res.json(appointments)
  }
}

export default ProviderAppointmentsController
