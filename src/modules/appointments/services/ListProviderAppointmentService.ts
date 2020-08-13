import { injectable, inject } from 'tsyringe'

import IAppointmentsRepository from '../repositories/InterfaceAppointmentsRepository'
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

@injectable()
class ListProviderAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { provider_id, day, month, year },
    )

    return appointments
  }
}

export default ListProviderAppointmentService
