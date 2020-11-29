import { InvalidFieldError } from "validation/errors/invalid-field-error";
import { EmailValidation } from "./email-validation";

describe("EmailValidation", () => {
  it("returns error if email is invalid", () => {
    const sut = new EmailValidation("email");
    const error = sut.validate("");
    expect(error).toEqual(new InvalidFieldError("email"));
  });
});
