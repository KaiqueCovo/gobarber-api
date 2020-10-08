import ListProviderAppointmentService from './ListProviderAppointmentService'

/** Fake repository */
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderAppointmentService: ListProviderAppointmentService
let fakeCacheProvider: FakeCacheProvider

describe('ListProviderAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    listProviderAppointmentService = new ListProviderAppointmentService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to list the appointments on a specific day', async () => {
    const firstAppointment = await fakeAppointmentsRepository.create({
      provider_id: 'provider-user',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    const secondAppointment = await fakeAppointmentsRepository.create({
      provider_id: 'provider-user',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    const appointments = await listProviderAppointmentService.execute({
      provider_id: 'provider-user',
      day: 20,
      month: 5,
      year: 2020,
    })

    expect(appointments).toEqual([firstAppointment, secondAppointment])
  })
})
