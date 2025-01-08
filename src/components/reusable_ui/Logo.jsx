import React from 'react'
import styled from 'styled-components';
import {theme} from '../Theme/index'
import cake from '../../assets/cupcake.png'


export default function Logo() {
  return (
    <StyledH1>CAKE<StyledImg src={cake} alt="Un Cake" />NEST</StyledH1>
  )
}

const StyledH1 = styled.h1`
color: ${theme.colors.primary};
font-size: ${theme.fonts.size.P5};
display: flex;
align-items: center;
margin: 0 auto;
`;

const StyledImg = styled.img`
  width: ${theme.spacing.xxl};
`;