import { startOfHour } from 'date-fns'

/* Entities */
import Appointment from '../infra/typeorm/entities/Appointment'

/* Interface repository */
import IAppointmentsRepository from '../repositories/InterfaceAppointmentsRepository'

/* Shared */
import AppError from '@shared/errors/AppError'

interface IRequest {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    /**
     * Get first hour from date
     */
    const appointmentDate = startOfHour(date)

    /**
     * Execute method findByDate for check if
     * existing appointment from same date
     */
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    )
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already exists!')
    }

    /**
     * Create a instance
     */
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
