import style from "./Header.module.css";
import Button from "../../ui/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalCart from "../ModalWindow/ModalWindow";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../features/cart/cartSlice";
import CartModalContent from "../ModalWindow/ModalContent/CartModalContent/CartModalContent";
import { RootState } from "../../app/store";

const Header = () => {
  const navigate = useNavigate();
  const [isOpenCartModal, setisOpenCartModal] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const isLoggin = useSelector((state: RootState) => state.auth.success);
  const isAdmin = useSelector((state: RootState) => state.auth.userInfo?.role)

  return (
    <>
      <nav className={style.header_container}>
        <Button
          otherButtonStyles={{
            backgroundColor: "transparent",
            marginLeft: 40,
            fontSize: 10,
          }}
          onClick={() => navigate("/pizzaList")}
          text="Our Pizza App"
        />
        <ul className={style.items_container}>
          <li>
            <Button text="Заказы" />
          </li>

          <li>
            <Button
              text={`Корзина ${cartCount}`}
              onClick={() => setisOpenCartModal(true)}
            />
          </li>
        </ul>
        {isLoggin ? (
          <NavLink to="/profile">
            <li>
              <Button text="Профиль" />
            </li>
          </NavLink>
        ) : (
          <>
          <NavLink to="/register"><Button text="регистрация" /></NavLink>
            
            <NavLink to="/login">
              <Button text="вход" />
            </NavLink>
          </>
        )}
        {isAdmin === "admin" ? <Button text="админка"/> : null}
      </nav>
      {isOpenCartModal && (
        <ModalCart
          size="small"
          isOpen={isOpenCartModal}
          onClose={() => setisOpenCartModal(false)}
          children={<CartModalContent />}
        />
      )}
    </>
  );
};

export default Header;
