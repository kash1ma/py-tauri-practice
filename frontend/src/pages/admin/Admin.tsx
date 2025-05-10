import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";

const Admin = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      gap: "20px",
      padding: "20px",

    }}>
      <h1 style={{
        marginBottom: "30px",
        fontSize: "2rem",
        textAlign: "center",
        color: "rgb(234, 124, 105)",
      }}>
        Панель администратора
      </h1>
      
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "100%",
        maxWidth: "300px"
      }}>
        <Button
          text="Пользователи"
          onClick={() => navigate("/admincrud/users")}
          otherButtonStyles={{
            width: "100%",
            padding: "12px 20px",
            backgroundColor: "#ff7b25",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        />
        
        <Button
          text="Пицца"
          onClick={() => navigate("/admincrud/pizzas")}
          otherButtonStyles={{
            width: "100%",
            padding: "12px 20px",
            backgroundColor: "#4a6fa5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default Admin;