import { container } from 'tsyringe'
import mailConfig from '@configs/mail'

import IStorageProvider from './StorageProvider/models/InterfaceStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/models/InterfaceMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'
import SESMailProvider from './MailProvider/implementations/SESMailProvider'

import IMailTemplateProvider from './MailTemplateProvider/models/InterfaceMailTemplateProvider'
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
)

console.log(mailConfig.driver)
container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
)
