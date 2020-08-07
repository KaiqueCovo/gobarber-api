import { getRepository, Repository, Raw } from 'typeorm'

/* Interface repository */
import IAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository'

/* Entities */
import Appointment from '../entities/Appointment'

/* Dtos */
import ICreateAppointmentDTO from '@modules/appointments/dtos/InterfaceCreateAppointmentDTO'
import InterfaceFindAllMonthFromProviderDTO from '@modules/appointments/dtos/InterfaceFindAllMonthFromProviderDTO'
import IFindAllDayFromProviderDTO from '@modules/appointments/dtos/InterfaceFindAllDayFromProviderDTO'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date })

    await this.ormRepository.save(appointment)

    return appointment
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    /**
     * Find appointment in database
     */
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    })

    return findAppointment
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: InterfaceFindAllMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = month.toString().padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    })

    return appointments
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = day.toString().padStart(2, '0')
    const parsedMonth = month.toString().padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    })

    return appointments
  }
}

export default AppointmentsRepository
