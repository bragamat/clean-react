import {
  IHttpPostClient,
  HttpPostParams,
} from "../protocols/http/http-post-client";

import { HttpStatusCode, HttpResponse } from "../protocols/http/http-response";

export class HttpPostClientSpy implements IHttpPostClient {
  url?: string;
  body?: object;
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
  };
  async post(params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
