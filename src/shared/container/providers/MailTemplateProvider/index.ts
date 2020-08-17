import { container } from 'tsyringe'

import IMailTemplateProvider from './models/InterfaceMailTemplateProvider'
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider'

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
)
