import { container } from 'tsyringe'

import IStorageProvider from './models/InterfaceStorageProvider'
import DiskStorageProvider from './implementations/DiskStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)
