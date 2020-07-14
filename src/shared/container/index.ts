import { container } from 'tsyringe'

import '@modules/users/providers'
import './providers'

import IAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '@modules/users/repositories/InterfaceUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

/* import IUserTokensRepository from '@modules/users/repositories/InterfaceUserTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository' */

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
