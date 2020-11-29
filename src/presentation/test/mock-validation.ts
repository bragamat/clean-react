import { IValidation } from '../protocols/validation'
export class ValidationStub implements IValidation {
  errorMessage: string

  validate (): string {
    return this.errorMessage
  }
}