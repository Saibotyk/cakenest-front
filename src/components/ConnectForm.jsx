import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "./Theme/index";
import { BsChevronRight } from "react-icons/bs";
import { IoPersonCircleOutline, IoBagAddOutline } from "react-icons/io5";
import apiAxios from "../../libs/axios.js";
import DocumentContext from "../context/AdminContext.jsx"
import { useContext } from "react";

export default function ConnectForm() {
  const {user, setUser} = useContext(DocumentContext);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    apiAxios("/sanctum/csrf-cookie");
  }, []); 

  const validateForm = () => {
    if (!login.email || !login.password) {
      setError("Please enter both email and password.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(login.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(""); 
    return true;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    apiAxios
      .post("/login", login)
      .then((response) => {
        console.log(response);
        setError("");
        apiAxios.get("/api/user").then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
        });
        navigate(`/order`);
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          setError("L'email ou le mot de passe est incorrect !");
        }
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  console.log(login);

  return (
    <ConnectContainer>
      <StyledH2 className="title">Bienvenue chez nous !</StyledH2>
      <StyledHr />
      <StyledH3>Connectez-vous</StyledH3>
      {error && <p className="error">{error}</p>}
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput>
          <IoPersonCircleOutline className="icon" />
          <input
            className="input"
            name="email"
            type="email"
            placeholder="Entrez votre E-mail"
            onChange={handleChange}
            value={login.email}
          />
        </StyledInput>
        <StyledInput>
          <IoBagAddOutline className="icon" />
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Entrez votre Mot de passe"
            onChange={handleChange}
            value={login.password}
          />
        </StyledInput>
        <StyledButton type="submit">
          <p>Mon espace</p> <BsChevronRight />
        </StyledButton>
      </StyledForm>
    </ConnectContainer>
  );
}

const ConnectContainer = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
  .error{
    color: red;
    background-color: white;
    width: 50%;
    text-align: center;
    padding: 3rem;
    border-radius: 25px;
    font-size:2rem;
    margin: auto;
  }
`;

const StyledButton = styled.button`
  background-color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  height: ${theme.spacing.xxl};
  font-family: "Open Sans", sans-serif;
  font-weight: ${theme.fonts.weights.heavy};
  font-size: ${theme.fonts.size.P4};
  border: none;
  border-radius: ${theme.borderRadius.round};
  gap: 1.5rem;
  cursor: pointer;
`;

const StyledHr = styled.hr`
  height: ${theme.spacing.xxs};
  background-color: ${theme.colors.primary};
  border: none;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const StyledInput = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  padding-left: 10%;
  gap: 1rem;
  height: ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.round};

  .icon {
    font-size: ${theme.fonts.size.P4};
    color: grey;
  }

  .input {
    width: 95%;
    height: 90%;
    font-size: ${theme.fonts.size.P3};
    font-weight: ${theme.fonts.weights.light};
    border: none;
  }
`;

const StyledH2 = styled.h2`
  font-family: "Pacifico", cursive;
  text-align: center;
  font-size: ${theme.fonts.size.P6};
  color: ${theme.colors.white};
  margin: 0;
`;

const StyledH3 = styled.h3`
  margin: 0;
  font-family: "Pacifico", cursive;
  text-align: center;
  font-size: ${theme.fonts.size.P4};
  color: ${theme.colors.white};
`;
