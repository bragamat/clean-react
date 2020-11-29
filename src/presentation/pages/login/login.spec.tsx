import React from 'react'
import * as Faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import 'jest-localstorage-mock'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'

import Login from './index'
import { ValidationStub, AuthenticationSpy } from '../../test'
import { InvalidCredentialsError } from 'domain/errors/invalid-credentials-error'


type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}
const history = createMemoryHistory({
  initialEntries: ['/login']
})

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy}/>
    </Router>
  )
  return {
    sut,
    authenticationSpy
  }
}


const populateField = (
  sut: RenderResult, name: string, 
  value = Faker.internet.email(), 
  password = Faker.internet.password()
  ): void => {

  const input = sut.getByTestId(name)
  fireEvent.input(input, {target: { value }})
}

const simulateValidSubmit = (sut: RenderResult, email = Faker.internet.email(), password = Faker.internet.password()): void => {
  const { getByTestId } = sut
  const emailValue = email
  const passwordValue = password
  populateField(sut, 'email', emailValue)
  populateField(sut, 'password', passwordValue)
  fireEvent.click(getByTestId('submit'))
}

describe('<Login />', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it('doesn\'t render loader and errors on start', () => {
    const validationError =  Faker.random.words()
    const { sut: {getByTestId} } = makeSut({validationError})
    const button = getByTestId('submit') as HTMLButtonElement
    const emailStatus = getByTestId('email-status')
    const passwordStatus = getByTestId('password-status')
    expect(getByTestId('error-wrap').childElementCount).toBe(0)
    expect(button.disabled).toBe(true)
    expect(emailStatus.title).toBe(validationError)
    expect(passwordStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('error')
    expect(passwordStatus.textContent).toBe('error')
  })

  it('shows email error if validation fails', () => {
    const validationError =  Faker.random.words()
    const { sut } = makeSut({validationError})
    populateField(sut, 'email', Faker.internet.email())
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
  })

  it('shows password error if validation fails', () => {
    const validationError =  Faker.random.words()
    const { sut } = makeSut({validationError})
    populateField(sut, 'email', Faker.internet.email())
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
  })

  it('shows valid password if validation succeeds', () => {
    const { sut } = makeSut()
    populateField(sut, 'email', Faker.internet.email())
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Ok!')
  })

  it('enables submit button if validation passes', () => {
    const { sut } = makeSut()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    populateField(sut, 'email', Faker.internet.email())
    populateField(sut, 'password', Faker.internet.password())
    expect(submitButton.disabled).toBe(false)
  })

  it('shows loader when submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    expect(sut.getByTestId('spinner')).toBeTruthy()
  })

  it('calls Authentication with correct values', () => {
    const { sut , authenticationSpy } = makeSut()
    const email = Faker.internet.email() 
    const password = Faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('submits only once', () => {
    const { sut , authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('doesn\'t call submit if form is invalid', () => {
    const validationError =  Faker.random.words()
    const { sut , authenticationSpy } = makeSut({validationError})
    populateField(sut, 'email', '')
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('presents error if authentication fails', async () => {
    const { sut , authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    simulateValidSubmit(sut)
    const errorWrap = sut.getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  it('adds access token to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken )
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('goes to sign up page', async () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('register')
    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })

})
