import React, { memo } from 'react';
import { Header as HeaderStyle } from './styles'

const Header = () => {
  return (
     <HeaderStyle>
        <img alt="logo" />
        <h1> 4Dev - Enquetes para Programadores </h1>
      </HeaderStyle>
  );
}

export default memo(Header)