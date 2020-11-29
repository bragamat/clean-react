import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Form, Footer } from "./styles";
import { Header, Input, FormStatus } from "../../components";

import Context from "../../contexts/form/form-context";
import { IValidation } from "presentation/protocols/validation";
import { IAuthentication } from "domain/usecases/authentication";

type Props = {
  validation: IValidation;
  authentication: IAuthentication;
};
const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory();
  const [state, setState] = React.useState({
    isLoading: false,
    errorMessage: "",
    emailError: "",
    passwordError: "",
    email: "",
    password: "",
  });

  React.useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      emailError: validation.validate("email", state.email),
      passwordError: validation.validate("password", state.password),
    }));
  }, [state.email, state.password, validation]);

  const signUser = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) return;
      setState((oldState) => ({ ...oldState, isLoading: true }));
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      localStorage.setItem("accessToken", account.accessToken);
      history.replace("/");
    } catch (error) {
      setState((oldState) => ({
        ...oldState,
        isLoading: false,
        mainError: error.message,
      }));
    }
  };

  return (
    <Container>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <Form data-testid={"form"} onSubmit={signUser}>
          <h2>Login</h2>
          <Input
            data-testid="email"
            type="email"
            name="email"
            placeholder="Your Email"
          />
          <Input
            data-testid="password"
            type="password"
            name="password"
            placeholder="Your Password"
          />
          <button
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
          >
            Entrar
          </button>
          <Link data-testid="register" to="/signup">
            Sign up
          </Link>
          <FormStatus />
        </Form>
      </Context.Provider>
      <Footer />
    </Container>
  );
};

export default Login;
