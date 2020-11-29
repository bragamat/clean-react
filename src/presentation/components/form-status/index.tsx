import React, { useContext } from 'react'
import { Spinner } from "../spinner";
import Context from '../../contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state: {isLoading, mainError} } = useContext(Context)
  return (
    <div data-testid="error-wrap" className="errorWrapper">
      { isLoading && <Spinner />}
      { mainError &&  <span data-testid="main-error" className="error">{mainError}</span>}
    </div>
  )
}

export default FormStatus