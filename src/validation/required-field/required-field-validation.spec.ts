import { RequiredFieldError } from "validation/errors/required-field-error";
import { RequiredFieldValidation } from "./required-field-validation";

import * as Faker from "faker";

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation(Faker.database.column());

describe("RequiredFieldValidation", () => {
  it("returns error if field is empty", () => {
    const sut = makeSut();
    const error = sut.validate("");
    expect(error).toEqual(new RequiredFieldError());
  });

  it("returns falsy if field is not empty", () => {
    const sut = makeSut();
    const error = sut.validate(Faker.internet.email());
    expect(error).toBeFalsy();
  });
});
