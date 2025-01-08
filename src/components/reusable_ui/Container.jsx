import React from 'react'
import styled from 'styled-components';
import { theme } from '../Theme';


export default function Container({ children }) {
    return (
        <ContainerStyled>
            {children}
        </ContainerStyled>
    )
}

const ContainerStyled = styled.div`
    background-color: ${theme.colors.greyLight};
    height:98vh;
    width: 98vw;
    margin: 5px auto;
    z-index: -1000 ;
    border-radius: ${theme.borderRadius.extraRound};
    box-shadow: 0px 8px 20px 8px rgba(0, 0, 0, 0.2) inset;
    
`;

