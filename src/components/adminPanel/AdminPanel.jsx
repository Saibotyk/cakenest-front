import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { theme } from '../Theme';
import AdminContext from '../../context/AdminContext';
import { FaChevronUp, FaPencilAlt, FaPlus, FaChevronDown } from "react-icons/fa";
import { GiCupcake } from "react-icons/gi";
import { MdPhotoCamera, MdOutlineEuroSymbol } from "react-icons/md";
import apiAxios from '../../../libs/axios';

export default function AdminPanel({ addOrModify, setAddOrModify, shopMenu, setShopMenu }) {
    const [isOpen, setIsOpen] = useState(true);
    const { isAdmin } = useContext(AdminContext);

    const [cupcake, setCupcake] = useState({
        name: "",
        price_in_cents: 0,
        url_img: "",
        description: "Un cupcake !",
        qty: 50
    });

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ajouter une validation simple
        if (!cupcake.name || !cupcake.url_img || isNaN(cupcake.price_in_cents) || cupcake.price_in_cents <= 0) {
            console.log("Validation error: all fields are required and must be valid.");
            return;
        }

        apiAxios.post('/api/addCupcake', cupcake)
            .then((response) => {
                console.log(response);
                // Ajout de retour visuel, comme un message de succès ou un toast
            })
            .catch((error) => {
                console.error("Error adding cupcake:", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCupcake({
            ...cupcake,
            [name]: value,
        });
    };

    const displayedImage = cupcake.url_img || "path_to_default_image.png";

    return (
        <ContainerAdminPanelStyled>
            <div className='container-btn'>
                <button className={isOpen ? 'btn-admin-light' : 'btn-admin'} onClick={togglePanel}>
                    {isOpen ? <FaChevronDown /> : <FaChevronUp />}
                </button>
                <button className={isOpen && addOrModify === "add" ? 'btn-admin' : 'btn-admin-light'} onClick={() => { setAddOrModify("add"); setIsOpen(true); }}>
                    <FaPlus /> Ajouter un produit
                </button>
                <button className={isOpen && addOrModify === "modify" ? 'btn-admin' : 'btn-admin-light'} onClick={() => { setAddOrModify("modify"); setIsOpen(true); }}>
                    <FaPencilAlt /> Modifier un produit
                </button>
            </div>
            {
                isOpen && isAdmin && addOrModify === "add" &&
                <div className='panel-add'>
                    <form className='form' onSubmit={handleSubmit}>
                        <img src={displayedImage} className='input-img' alt="Cupcake" />
                        <div className='input-list'>
                            <div className='input'>
                                <GiCupcake />
                                <input type="text" name='name' placeholder="Nom du cupcake" onChange={handleChange} value={cupcake.name} />
                            </div>
                            <div className='input'>
                                <MdPhotoCamera />
                                <input type="text" name='url_img' placeholder="URL de l'image" onChange={handleChange} value={cupcake.url_img} />
                            </div>
                            <div className='input'>
                                <MdOutlineEuroSymbol />
                                <input type="text" name='price_in_cents' placeholder="Prix en cents" onChange={handleChange} value={cupcake.price_in_cents} />
                            </div>
                            <button className='btn-form'>Ajouter un nouveau produit</button>
                        </div>
                    </form>
                </div>
            }
            {
                isOpen && isAdmin && addOrModify === "modify" &&
                <div className='panel-modify'>
                    <p>Modifier un produit</p>
                </div>
            }
        </ContainerAdminPanelStyled>
    );
}

const ContainerAdminPanelStyled = styled.div`
    margin-left: 3rem;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 2%;
    width: 93%;

    .container-btn{
        display: flex;
        margin: 0;
    }

    .btn-admin{
        border: none;
        background-color: ${theme.colors.background_dark};
        color: white;
        padding: 10px 20px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        cursor: pointer;
    }
    
    .btn-admin-light{
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        color: grey;
        border: none;
        padding: 10px 20px;
        box-shadow: 0px -8px 4px -3px rgba(0,0,0,0.1);
        cursor: pointer;
    }

    .panel-add, .panel-modify{
        background-color:${theme.colors.background_white};
        height:25vh;
        box-shadow: 0px -8px 4px -3px rgba(0,0,0,0.1);
    }

    .form{
        display: flex;
        gap: 2rem;
        align-items: center;
    }

    .input-img{ 
        width: 10%;
        border-radius: 25%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border: 1px solid ${theme.colors.greyLight};
    }

    .input-list{
        display: flex;
        flex-direction: column;
        gap: .5rem;
        width: 100%;
    }

    .input {
        display: flex;
        align-items: center;
        background-color: #80808012;
        padding:.1rem 1rem;
        width: 50%;
        border-radius: 5px;
    }
    
    .input input{
        background-color: rgba(128, 128, 128, 0.010);
        border: none;
        width: 100%;
    }

    .btn-form{
        background-color: green;
        width: 15%;
        padding:6px 10px;
        border-radius: 5px;
        border: none;
        color: white;
        cursor: pointer;
    }
`;
