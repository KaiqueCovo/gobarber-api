import CreateAppointmentService from './CreateAppointmentService'

/** Fake Repository */
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

/** Shared */
import AppError from '@shared/errors/AppError'

let fakeAppointments: FakeAppointmentsRepository
let fakeNotifications: FakeNotificationsRepository
let createAppointment: CreateAppointmentService
let fakeCacheProvider: FakeCacheProvider

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointments = new FakeAppointmentsRepository()
    fakeNotifications = new FakeNotificationsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    createAppointment = new CreateAppointmentService(
      fakeAppointments,
      fakeNotifications,
      fakeCacheProvider,
    )
  })
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'provider-user',
      user_id: 'user-id',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('provider-user')
  })

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointmentDate = new Date(2020, 4, 10, 13)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-user',
      user_id: 'user-id',
    })

    const secondAppointmentDateEqual = createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-user',
      user_id: 'user-id',
    })

    await expect(secondAppointmentDateEqual).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: 'provider-user',
      user_id: 'user-id',
    })

    await expect(appointment).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: 'same-user',
      user_id: 'same-user',
    })

    await expect(appointment).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment before 8am an after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const firstAppointment = createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      provider_id: 'provider-user',
      user_id: 'user-id',
    })

    const secondAppointment = createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      provider_id: 'provider-user',
      user_id: 'user-id',
    })

    await expect(firstAppointment).rejects.toBeInstanceOf(AppError)
    await expect(secondAppointment).rejects.toBeInstanceOf(AppError)
  })
})
