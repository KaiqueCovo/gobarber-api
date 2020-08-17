import nodemailer, { Transporter } from 'nodemailer'
import aws from 'aws-sdk'
import { injectable, inject } from 'tsyringe'

import mailConfig from '@configs/mail'

import IMailProvider from '../models/InterfaceMailProvider'

import ISendMailDTO from '../dtos/ISendMailDTO'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/InterfaceMailTemplateProvider'

interface IMessage {
  to: string
  body: string
}

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    })
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text: await this.mailTemplateProvider.parse(templateData),
    })
  }
}

export default SESMailProvider
