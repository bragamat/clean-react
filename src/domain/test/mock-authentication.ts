import { AuthenticationParams } from "../usecases/authentication";
import * as Faker from "faker";

export const mockAuthentication = (): AuthenticationParams => ({
  email: Faker.internet.email(),
  password: Faker.internet.password(),
});
