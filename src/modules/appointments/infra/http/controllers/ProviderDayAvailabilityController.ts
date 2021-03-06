import { Request, Response } from 'express'
import { container } from 'tsyringe'

/* Services */
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params
    const { day, month, year } = req.body

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    )

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    })

    return res.json(availability)
  }
}

export default ProviderDayAvailabilityController
