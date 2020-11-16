import { AuthenticationParams } from "../usecases/authentication";
import { AccountModel } from "../models/account-model";
import * as Faker from "faker";

export const mockAuthentication = (): AuthenticationParams => ({
  email: Faker.internet.email(),
  password: Faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: Faker.random.uuid(),
});
