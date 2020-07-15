import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/InterfaceStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/models/InterfaceMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
)
