import { EntityRepository, Repository } from 'typeorm'
import Appointment from '../models/Appointment'

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  /**
   * Method find date in appointments
   * @param date Date
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    /**
     * Find appointment in database
     */
    const findAppointment = await this.findOne({ where: { date } })

    return findAppointment || null
  }
}

export default AppointmentRepository
