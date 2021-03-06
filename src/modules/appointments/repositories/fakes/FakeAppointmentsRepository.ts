import { uuid } from 'uuidv4'
import { isEqual, getMonth, getYear, getDate } from 'date-fns'

/* Entities */
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

/* Dtos */
import ICreateAppointmentDTO from '@modules/appointments/dtos/InterfaceCreateAppointmentDTO'
import IFindAllMonthFromProviderDTO from '@modules/appointments/dtos/InterfaceFindAllMonthFromProviderDTO'
import IFindAllDayFromProviderDTO from '@modules/appointments/dtos/InterfaceFindAllDayFromProviderDTO'

class AppointmentsRepository {
  private appointments: Appointment[] = []

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {
      id: uuid(),
      provider_id,
      user_id,
      date,
    })

    this.appointments.push(appointment)

    return appointment
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    )

    return findAppointment
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    )

    return appointments
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    )

    return appointments
  }
}

export default AppointmentsRepository
