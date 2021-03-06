import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

/** Fake repository */
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    )
  })

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '2',
      date: new Date(2020, 4, 20, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '2',
      date: new Date(2020, 4, 20, 10, 0, 0),
    })

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      day: 20,
      year: 2020,
      month: 5,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 12,
          available: true,
        },
      ]),
    )
  })
})
