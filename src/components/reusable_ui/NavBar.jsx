import React from 'react'
import styled from 'styled-components'
import { theme } from '../Theme';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Profile from '../Profile';
import { refresh } from '../utils/refreshWindow';
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import AdminContext from '../../context/AdminContext';
import { FaCartShopping } from "react-icons/fa6";
import Kart from './Kart';


export default function NavBar({ username }) {

    const {isAdmin, setIsAdmin }= useContext(AdminContext);

    const [isOpen, setIsOpen] = useState(false)

    const toggleBtn = () => {
        if (isAdmin) {
            setIsAdmin(false)
        } else {
            
            setIsAdmin(true)
            toast.info("Mode ADMIN actif")
        }
    }

    return (
        <NavBarStyled>
            <button className='logo' onClick={() => refresh()}>
                <Logo />
            </button>
                <button className='btn' onClick={() => {isOpen ? setIsOpen(false) : setIsOpen(true)}}><FaCartShopping/></button>
            <div className='container-nav'>
                <button className={isAdmin ? 'container-btn-drag-on': 'container-btn-drag-off'} onClick={() => toggleBtn()}>
                    <div className='btn-drag-off'></div>
                    <p id='text-admin' className='text-drag-off'>{isAdmin ? 'DESACTIVER LE MODE ADMIN ': 'ACTIVER LE MODE ADMIN'}</p>
                </button>
                <Profile username={username} />
                {isOpen && <Kart />}
            </div>
        </NavBarStyled>
    )
}

const NavBarStyled = styled.nav`
    background-color: ${theme.colors.greyLight};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-right-radius: ${theme.borderRadius.extraRound};
    border-top-left-radius: ${theme.borderRadius.extraRound};
    padding: ${theme.spacing.sm};
    box-shadow: 0px 34px 12px 0px rgba(0,0,0,0.2),0px 10px 15px -3px rgba(0,0,0,0.1);
    z-index: 1000;
    height: 10vh;

    .logo{
        border: none;
        background-color: rgba(0,0,0,0);
    }

    .logo:hover {
        cursor: pointer;
    }

    .container-nav{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items:center;
    }

    .container-btn-drag-off{
        display: flex;
        justify-content: space-between;
        background-color: ${theme.colors.background_dark};
        border-radius: 50px;
        padding: 3px;
        width:14rem;
        height:100%;
        transition: all 500ms ease;
        border: none;
        cursor: pointer;
    }

    .btn-drag-off{
        background-color: ${theme.colors.primary};
        aspect-ratio: 1 / 1;
        border-radius:${theme.borderRadius.circle};
    }

    .text-drag-off{
        font-size: ${theme.fonts.size.XS};        
        color: ${theme.colors.primary};
        font-weight: bold;
        text-align: left;
        margin:auto;
    }

    .container-btn-drag-on{
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        background-color: ${theme.colors.background_white};
        border:1px solid ${theme.colors.primary};
        border-radius: 50px;
        padding: 3px;
        width:14rem;
        height:100%;
        transition: all 500ms ease;
        cursor: pointer;
        border: none;
    }

    .btn-drag-on{
        background-color: ${theme.colors.primary};
        aspect-ratio: 1 / 1;
        border-radius:${theme.borderRadius.circle};
    }

    .text-drag-on{
        font-size: ${theme.fonts.size.XS};
        color: ${theme.colors.dark};
        font-weight: bold;
        text-align: left;
        margin: auto;
    }

    .btn{
        display: flex;
        background-color: white;
        color: rgb(103, 182, 185);
        padding: .5rem;
        font-size: 2rem;
        border-radius: 15px;
        border: solid 1px rgb(103, 182, 185);
    }

    .btn:hover{
        cursor: pointer;
        transform: scale(1.2);
        transition: all 250ms ease-in-out;
    }
`;
