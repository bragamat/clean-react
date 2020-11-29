import { RequiredFieldError } from "validation/errors/required-field-error";
import { RequiredFieldValidation } from "./required-field-validation";

describe("RequiredFieldValidation", () => {
  it("returns error if field is empty", () => {
    const sut = new RequiredFieldValidation("email");
    const error = sut.validate("some_email");
    expect(error).toEqual(new RequiredFieldError());
  });
});
