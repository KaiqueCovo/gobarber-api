import CreateAppointmentService from './CreateAppointmentService'

/** Fake Repository */
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

/** Shared */
import AppError from '@shared/errors/AppError'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointments = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointments)

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1',
      user_id: '2',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('1')
  })

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointments = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointments)

    const appointmentDate = new Date()

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1',
      user_id: '2',
    })

    const secondAppointmentDateEqual = createAppointment.execute({
      date: appointmentDate,
      provider_id: '1',
      user_id: '2',
    })

    await expect(secondAppointmentDateEqual).rejects.toBeInstanceOf(AppError)
  })
})
