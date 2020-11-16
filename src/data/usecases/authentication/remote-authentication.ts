import { IHttpPostClient } from "../../protocols/http/http-post-client";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { AuthenticationParams } from "../../../domain/usecases/authentication";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials-error";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}
  async auth(params: AuthenticationParams): Promise<void> {
    const response = await this.httpPostClient.post({
      body: params,
      url: this.url,
    });
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
