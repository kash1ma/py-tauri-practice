import { useEffect, useRef, useState } from "react";
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

const UserAdmin = () => {
  const { data, isLoading, sendRequset } = useFetch<User[]>();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const tableContRef = useRef<HTMLDivElement>(null);
  const users = Array.isArray(data) ? data : [];

  useEffect(() => {
    sendRequset("http://localhost:8000/users", "get");
  }, []);

  useEffect(() => {
    if (tableContRef.current && scrollPosition > 0) {
      tableContRef.current.scrollTop = scrollPosition;
    }
  }, [data]);

  const handleDelete = async (user: User) => {
    if (tableContRef.current) {
      setScrollPosition(tableContRef.current.scrollTop);
    }
    
    await sendRequset(`http://localhost:8000/users/${user.id}`, "delete");
    await sendRequset("http://localhost:8000/users", "get");
  };

  const columns: Column<User>[] = [
    { key: "id", title: "ID", dataIndex: "id" },
    { key: "username", title: "Имя", dataIndex: "username" },
    { key: "email", title: "Почта", dataIndex: "email" },
    { key: "phone", title: "Телефон", dataIndex: "phone" },
    { key: "role", title: "Роль", dataIndex: "role" },
    {
      key: "actions",
      title: "Действия",
      render: (_, user) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            onClick={() => handleDelete(user)}
            text="Удалить"
            otherButtonStyles={{ backgroundColor: "red", color: "white" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div ref={tableContRef} style={{ maxHeight: "100vh", overflow: "auto" }}>
      <h2>Админ-панель</h2>
      {isLoading && <p>Загрузка...</p>}
      {users && (
        <Table<User>
          data={users}
          columns={columns}
          rowKey="id"
        />
      )}
    </div>
  );
};

export default UserAdmin;