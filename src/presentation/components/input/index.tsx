import React, { useContext } from 'react';
import Context from '../../contexts/form/form-context'
import { InputContainer } from './styles';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
const Input: React.FC<Props> = (props: Props) => {
  const {state, setState} = useContext(Context)
  const error = state[`${props.name}Error`]

  const getTitle = (): string => {
    return error || 'Ok!'
  }
  const getStatus = (): string => {
    return error ? 'error' : 'Ok!'
  }
  const enableInput = (event: React.FocusEvent<HTMLInputElement>):void => {
    event.target.readOnly = false
  }
  const changeInput = (event: React.FocusEvent<HTMLInputElement>):void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <InputContainer>
      <input {...props} readOnly onFocus={enableInput}
       onChange={changeInput}/>
      <span data-testid={`${props.name}-status`} title={getTitle()}>{getStatus()}</span>
    </InputContainer>
  );
}

export default Input