import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";

const Admin = () => {
  const naviage = useNavigate();
  return (
    <>
    <h2 style={{textAlign: "center"}}>Таблицы</h2>
      <Button text="Пользователи" onClick={() => naviage("/admincrud/users")}/>
      <Button text="Пицца" onClick={() => naviage("/admincrud/pizzas")} />
    </>
  );
};

export default Admin;
