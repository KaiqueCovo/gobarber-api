import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/InterfaceMailProvider'

class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = []
  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message)
  }
}

export default FakeMailProvider
