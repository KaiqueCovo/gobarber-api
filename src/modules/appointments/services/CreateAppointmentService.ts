import { startOfHour, isBefore, getHours } from 'date-fns'
import { injectable, inject } from 'tsyringe'

/* Entities */
import Appointment from '../infra/typeorm/entities/Appointment'

/* Interface repository */
import IAppointmentsRepository from '../repositories/InterfaceAppointmentsRepository'

/* Shared */
import AppError from '@shared/errors/AppError'

interface IRequest {
  provider_id: string
  user_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    /**
     * Get first hour from date
     */
    const appointmentDate = startOfHour(date)

    /**
     * Verify date is before
     */
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("Your can't create an appointment on a past date")
    }

    /**
     * Verify provider is same user
     */
    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself")
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You can't only create appointments between 8am and 5pm",
      )
    }

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
      user_id,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
