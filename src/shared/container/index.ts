import { container } from 'tsyringe'

import '@modules/users/providers'

import IAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '@modules/users/repositories/InterfaceUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)