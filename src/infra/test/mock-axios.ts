import axios from "axios";
import * as Faker from "faker";

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue({
    data: Faker.random.objectElement(),
    status: Faker.random.number(),
  });
  return mockedAxios;
};
