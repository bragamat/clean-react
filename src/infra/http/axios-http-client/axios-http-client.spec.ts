import { AxiosHttpClient } from "./axios-http-client";
import { mockPostRequest } from "../../../data/test/mock-http-post";

import { mockAxios } from "../../test";
import axios from "axios";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient(); // system under test
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe("AxiosHttpClient", () => {
  it("calls axios with correct values", async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut(); // system under test
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it("returns correct statusCode and body", async () => {
    const { sut, mockedAxios } = makeSut(); // system under test
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
