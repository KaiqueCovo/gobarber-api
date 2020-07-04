import { EntityRepository, Repository } from 'typeorm'

/* Entities */
import Appointment from '../infra/typeorm/entities/Appointment'

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
