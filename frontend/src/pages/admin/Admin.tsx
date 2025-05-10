import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <>
    <h2 style={{textAlign: "center"}}>Таблицы</h2>
      <Button text="Пользователи" onClick={() => navigate("/admincrud/users")}/>
      <Button text="Пицца" onClick={() => navigate("/admincrud/pizzas")} />
    </>
  );
};

export default Admin;
