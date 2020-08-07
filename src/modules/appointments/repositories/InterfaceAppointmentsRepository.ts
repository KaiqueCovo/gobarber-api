import Appointment from '../infra/typeorm/entities/Appointment'

/* Dtos */
import ICreateAppointmentDTO from '../dtos/InterfaceCreateAppointmentDTO'
import IFindAllMonthFromProviderDTO from '../dtos/InterfaceFindAllMonthFromProviderDTO'
import IFindAllDayFromProviderDTO from '../dtos/InterfaceFindAllDayFromProviderDTO'

export default interface IAppoinmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  findAllInMonthFromProvider(
    data: IFindAllMonthFromProviderDTO,
  ): Promise<Appointment[]>
  findAllInDayFromProvider(
    data: IFindAllDayFromProviderDTO,
  ): Promise<Appointment[]>
}
