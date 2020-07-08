import CreateAppointmentService from './CreateAppointmentService'

/** Fake Repository */
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

/** Shared */
import AppError from '@shared/errors/AppError'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const FakeAppointments = new FakeAppointmentsRepository()
    const CreateAppointment = new CreateAppointmentService(FakeAppointments)

    const appointment = await CreateAppointment.execute({
      date: new Date(),
      provider_id: '1',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('1')
  })

  it('should not be able to create two appointments on the same time', async () => {
    const FakeAppointments = new FakeAppointmentsRepository()
    const CreateAppointment = new CreateAppointmentService(FakeAppointments)

    const appointmentDate = new Date()

    await CreateAppointment.execute({
      date: appointmentDate,
      provider_id: '1',
    })

    const secondAppointmentDateEqual = CreateAppointment.execute({
      date: appointmentDate,
      provider_id: '1',
    })

    return expect(secondAppointmentDateEqual).rejects.toBeInstanceOf(AppError)
  })
})
