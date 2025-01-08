import { BsPersonCircle } from "react-icons/bs"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { theme } from "../components/Theme/index"
import apiAxios from "../../libs/axios"
import { Navigate } from "react-router-dom/dist"
import { useNavigate } from "react-router-dom/dist"

export default function Profile({ username }) {
  const navigate = useNavigate();
  return (
    <ProfileStyled>
      <div className="info">
        <p>
          Salut <b>{username}</b>
        </p>
        <button onClick={() => {apiAxios.post("/logout", []);localStorage.removeItem("user"); navigate("/");}}>
          <div className="description">
            <small>Se déconnecter</small>
          </div>
        </button>
      </div>
      <div className="picture">
        <BsPersonCircle />
      </div>
    </ProfileStyled>
  )
}

const ProfileStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  min-width: 100px;
  margin: 0 2px;

  .info {
    text-align: right;
    margin-right: 10px;
    p {
      margin: 0;
      color: ${theme.colors.greyBlue};
      b {
        color: ${theme.colors.primary};
      }
    }
    a {
      text-decoration: none;
      .description {
        &:hover {
          text-decoration: underline;
          color: ${theme.colors.greyDark};
        }
        small {
          font-size: ${theme.fonts.size.XXS};
          color: ${theme.colors.greyBlue};
          font-weight: ${theme.fonts.weights.medium};
          text-decoration: none;
          position: relative;
          bottom: 2px;
        }
      }
    }
  }

  .picture {
    /* border: 1px solid red; */
    height: auto;
    display: flex;
    height: 100%;
    font-size: ${theme.fonts.size.P4};
    color: ${theme.colors.greyBlue};
  }
`

