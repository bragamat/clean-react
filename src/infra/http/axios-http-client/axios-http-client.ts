import {
  HttpPostParams,
  IHttpPostClient,
} from "../../../data/protocols/http/http-post-client";
import { HttpResponse } from "data/protocols/http/http-response";
import axios from "axios";

export class AxiosHttpClient implements IHttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
