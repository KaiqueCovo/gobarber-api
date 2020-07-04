import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppError from '../errors/AppError'

import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'

interface RequestDTO {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    /**
     * Get methods from repository Appointment
     */
    const appointmentRepository = getCustomRepository(AppointmentRepository)

    /**
     * Get first hour from date
     */
    const appointmentDate = startOfHour(date)

    /**
     * Execute method findByDate for check if
     * existing appointment from same date
     */
    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    )
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already exists!')
    }

    /**
     * Create a instance
     */
    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    })

    /**
     * Save instance in database
     */
    await appointmentRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
