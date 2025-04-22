import style from "./Header.module.css";
import Button from "../../ui/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalCart from "../modalCart/ModalCart";

const Header = () => {
  const navigate = useNavigate();
  const [isOpenCartModal, setisOpenCartModal] = useState(false);

  return (
    <>
      <nav className={style.header_container}>
        <Button
          otherButtonStyles={{
            backgroundColor: "transparent",
            marginLeft: 40,
            fontSize: 30,
          }}
          onClick={() => navigate("/pizzaList")}
          text="Our Pizza App"
        />
        <ul className={style.items_container}>
          <NavLink to="/profile">
            <li>
              <Button text="Профиль" />
            </li>
          </NavLink>
          <li>
            <Button text="Заказы" />
          </li>
         
            <li>
              <Button text="Корзина" onClick={() => setisOpenCartModal(true)} />
            </li>
         
        </ul>
      </nav>
      {isOpenCartModal && (<ModalCart isOpen={isOpenCartModal} onClose={() => setisOpenCartModal(false)}/>)}
    </>
  );
};

export default Header;
