import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: space-between;
`;


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  align-self: center;
  box-shadow: 0px 1px 3px -1px black;
  width: 100%;
  max-width: 400px;
  h2 {
    color: brown;
    text-align: center;
    font-size: 20px;
    text-transform: uppercase;
  }

  button {
    margin-top: 16px;
  }

  span {
    text-align: center;
    color: brown;
    text-transform: lowercase;
    margin-top: 16px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;


export const Footer = styled.footer`
  background-color: violet;
  height: 48px;
`;
