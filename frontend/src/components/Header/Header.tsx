import style from "./Header.module.css";
import Button from "../../ui/Button/Button";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
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
      </ul>
    </nav>
  );
};

export default Header;
