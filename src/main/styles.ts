import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

body {
  background-color: #f1f1f1;
}

input[type="password"],input[type="email"] {
  border: 1px solid brown;
  line-height: 40px;
  border-radius: 4px;
  padding: 0 40px 0 8px;

  &:focus {
    outline-color: brown;
  }
}

button {
  background-color: violet;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  line-height: 40px;

  &:hover {
    opacity: 0.9;
  }
}
`;