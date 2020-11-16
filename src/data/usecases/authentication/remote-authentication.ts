import { AccountModel } from "../../../domain/models/account-model";
import { IHttpPostClient } from "../../protocols/http/http-post-client";
import { HttpStatusCode } from "../../protocols/http/http-response";
import {
  AuthenticationParams,
  IAuthentication,
} from "../../../domain/usecases/authentication";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials-error";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";

export class RemoteAuthentication implements IAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({
      body: params,
      url: this.url,
    });
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
