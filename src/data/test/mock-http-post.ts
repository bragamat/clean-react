import { HttpPostParams } from "../protocols/http/http-post-client";
import * as Faker from "faker";

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: Faker.internet.url(),
  body: Faker.random.objectElement(),
});
