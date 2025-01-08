import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Kart() {
  const [presentKart, setPresentKart] = useState([]);

  useEffect(() => {
    const kartData = localStorage.getItem("kart");
    if (kartData) {
      setPresentKart(JSON.parse(kartData).items);
    }
  }, []);

  const calculate = (price, qty) => {
    return `${(price * qty) / 100} €`;
  }


  return (
    <KartContainer>
      {presentKart.length > 0 ? (
        presentKart.map((item, index) => (
          <div className="kart" key={index}>
            <p>{item.name} -</p>
            <p>Quantité: {item.qty} - </p>
            <p>{calculate(item.price, item.qty)}</p>
          </div>
        ))
      ) : (
        <p>Your kart is empty.</p>
      )}
    </KartContainer>
  );
}

const KartContainer = styled.div`
  position: absolute;
  top: calc(100vh - 50%);
  left: calc(100vw - 50%);
  background-color: aliceblue;
  padding: 5rem;

  .kart{
    display: flex;
  }
`;
