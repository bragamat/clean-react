import { IAuthentication, AuthenticationParams } from 'domain/usecases/authentication'
import { AccountModel } from 'domain/models/account-model'
import { mockAccountModel } from 'domain/test/mock-account'

export class AuthenticationSpy implements IAuthentication {
  account = mockAccountModel()
  params: AuthenticationParams
  callsCount = 0
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}