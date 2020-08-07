import ListProvidersService from './ListProvidersService'

/** Fake repository */
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

let fakeUsersRepository: FakeUsersRepository
let listProvidersService: ListProvidersService

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    listProvidersService = new ListProvidersService(fakeUsersRepository)
  })

  it('should be able to list the providers', async () => {
    const firstUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const secondUser = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456',
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    })

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([firstUser, secondUser])
  })
})
