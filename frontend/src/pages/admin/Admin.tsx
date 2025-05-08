import React, { useState } from "react";
import UserAdmin from "./UsersAdmin";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";

const Admin = () => {
  const naviage = useNavigate();
  return (
    <>
      <Button text="Пользователи" onClick={() => naviage("/admincrud/users")}/>
      <Button text="Пицца" onClick={() => naviage("/admincrud/pizzas")} />
    </>
  );
};

export default Admin;
