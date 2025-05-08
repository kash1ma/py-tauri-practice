import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Table, { Column } from "../../components/Table/Table";
import Button from "../../ui/Button/Button";

type User = {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: string;
};

const Admin = () => {
  const { data, isLoading, sendRequset } = useFetch<User[]>();

  useEffect(() => {
    sendRequset("http://localhost:8000/users", "get");
  }, []);

  const users = data?.data;


  const handleEdit = (user: User) => {

  };

  const handleDelete = (user: User) => {
  };

  const columns: Column<User>[] = [
    { key: "id", title: "ID" },
    { key: "username", title: "Имя" },
    { key: "email", title: "Почта" },
    { key: "phone", title: "Телефон" },
    { key: "role", title: "Роль" },
    {
      key: "id", 
      title: "Действия",
      render: (_, user) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button onClick={() => handleEdit(user)} />
          <Button onClick={() => handleDelete(user)} otherButtonStyles={{ backgroundColor: "red", color: "white" }} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Админ-панель</h2>
      {isLoading && <p>Загрузка...</p>}
      {users && <Table<User> data={users} columns={columns} />}
    </div>
  );
};

export default Admin;