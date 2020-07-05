import Appointment from '../infra/typeorm/entities/Appointment'

/* Dtos */
import ICreateAppointmentDTO from '../dtos/InterfaceCreateAppointmentDTO'

export default interface IAppoinmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}
