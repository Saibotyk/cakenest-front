import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../components/Theme";
import NavBar from "../components/reusable_ui/NavBar";
import Container from "../components/reusable_ui/Container";
import Card from "../components/reusable_ui/Card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPanel from "../components/adminPanel/AdminPanel";
import DocumentContext from "../context/AdminContext";
import apiAxios from "../../libs/axios";

export default function OrderPage() {
  const { isAdmin } = useContext(DocumentContext);
  const [addOrModify, setAddOrModify] = useState("add");
  const [shopMenu, setShopMenu] = useState([]);
  const [user, setUser] = useState([]);
  const [kart, setKart] = useState(() => {
    const savedKart = localStorage.getItem("kart");
  
    return savedKart ? JSON.parse(savedKart) : [];
  });
  
  const storedUser = localStorage.getItem("user");
  console.log(kart);
  
  useEffect(() => {
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const fetchShopMenu = async () => {
      try {
        const response = await apiAxios.get(`/api/getCupcakes`);
        setShopMenu(response.data);
      } catch (error) {
        console.error("Error fetching shop menu:", error);
      }
    };

    fetchShopMenu();
  }, []); 

  return (
    <BackgroundStyled>
      <Container>
        <NavBar username={user.name} />
        <ShopStyled>
          {shopMenu.map((product) => (
            <Card
              key={product.id}
              image={product.url_img}
              name={product.name}
              price={product.price_in_cents}
              cupcake_id={product.id}
              qtyProduct={product.qty}
              kart={kart}
              setKart={setKart}
            />
          ))}
        </ShopStyled>
        {isAdmin && (
          <AdminPanel
            addOrModify={addOrModify}
            setAddOrModify={setAddOrModify}
            shopMenu={shopMenu}
            setShopMenu={setShopMenu}
          />
        )}
        {/* <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition="Bounce"
        /> */}
      </Container>
    </BackgroundStyled>
  );
}

const BackgroundStyled = styled.div`
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${theme.colors.primary};
  height: 100vh;
  width: 100vw;
`;

const ShopStyled = styled.div`
  display: grid;
  overflow-y: scroll;
  grid-template-columns: repeat(4, 1fr);
  padding: 50px 50px 150px;
  gap: 5rem;
  max-height: 65vh;
`;
