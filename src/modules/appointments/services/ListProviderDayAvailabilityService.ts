import { injectable, inject } from 'tsyringe'
import { getHours } from 'date-fns'

import IAppointmentsRepository from '../repositories/InterfaceAppointmentsRepository'
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

type IResponse = {
  hour: number
  available: boolean
}[]

@injectable()
class ListProviderDayAvailavilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    )

    const hourStart = 8

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    )

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      )
      return { hour, available: !hasAppointmentInHour }
    })

    return availability
  }
}

export default ListProviderDayAvailavilityService
