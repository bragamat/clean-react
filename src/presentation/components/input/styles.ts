import styled from "styled-components";

export const InputContainer = styled.div`
  margin-top: 16px;
  display: flex;
  position: relative;
  align-items: center;

  input {
    flex-grow: 1;
  }
  span {
    position: absolute;
    right: 8px;
    font-size: 12px;
    cursor: help;
    /* display: none; */
  }
`;