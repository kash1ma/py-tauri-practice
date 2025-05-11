import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Table, { Column } from "../../components/Table/Table";
import Button from "../../ui/Button/Button";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import UsersAdminCrud from "../../components/ModalWindow/ModalContent/UsersAdminCrud/UsersAdminCrud";
import Input from "../../ui/Input/Input";
import { TypesInput } from "../../types/enums/InputEnums";
import useInput from "../../hooks/useInput";
import handleCloseModal from "../../helpers/closeModal";

type User = {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: string;
  password: string
};

const UserAdmin = () => {
  const { data, isLoading, sendRequset } = useFetch<User[]>();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const tableContRef = useRef<HTMLDivElement>(null);
  const users = Array.isArray(data) ? data : [];
  const [isOpenModalEdit, setIsModalOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)

  const {value: password, handleChange: handleChangePassword} = useInput("")
  const {value: username, handleChange: handleChangeUsername} = useInput("")
  const {value: email, handleChange: handleChangeEmail} = useInput("")
  const {value: phone, handleChange: handleChangePhone} = useInput("")
  const {value: role, handleChange: handleChangeRole} = useInput("user")

  const handleSaveChanges = async (updatedUser: User) => {
    await sendRequset(
      `http://localhost:8000/users/${updatedUser.id}`,
      "patch",
      updatedUser
    );
    await sendRequset("http://localhost:8000/users", "get");
    setIsModalOpenEdit(false);
    setSelectedUser(null);
  };

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



  const handleCreateUser =  async () => {
    await sendRequset("http://localhost:8000/users", "post", {email: email , phone: String(phone), username: username, role: String(role), password : String(password)})
    handleCloseModal()
    await sendRequset("http://localhost:8000/users", "get");
  }

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
          <Button
            text="Изменить"
            otherButtonStyles={{ backgroundColor: "blue", color: "white" }}
            onClick={() => {
              setSelectedUser(user);
              setIsModalOpenEdit(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div ref={tableContRef} style={{ maxHeight: "100vh", overflow: "auto" }}>
      <h2
        style={{
          color: "rgb(234, 124, 105)",
          padding: "10px",
          fontSize: "50px",
        }}
      >
        Админ-панель <br />
        Пользователи
      </h2>
      <Button onClick={() => setIsOpenModalCreate(true)} text="добавить пользователя"/>
        {isOpenModalCreate && (
          <ModalWindow size="large" isOpen={isOpenModalCreate} onClose={() => setIsOpenModalCreate(false)}>
            <Input type={TypesInput.TEXT} onChange={handleChangePassword} initialValue={password} placeholder="Пароль"/>
            <Input type={TypesInput.TEXT} onChange={handleChangeUsername} initialValue={username} placeholder="Имя"/>
            <Input type={TypesInput.EMAIL} onChange={handleChangeEmail} initialValue={email} placeholder="Почта"/>
            <Input type={TypesInput.NUMBER} onChange={handleChangePhone} initialValue={phone} placeholder="Телефон"/>
            <Input type={TypesInput.TEXT} onChange={handleChangeRole} initialValue={role} placeholder="Роль"/>
            <Button text="создать пользователя" onClick={handleCreateUser}/>
          </ModalWindow>
        )}
      {isLoading && <p>Загрузка...</p>}

      <div
        ref={tableContRef}
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {users && <Table<User> data={users} columns={columns} rowKey="id" />}
      </div>

      {isOpenModalEdit && selectedUser && (
        <ModalWindow
          isOpen={isOpenModalEdit}
          onClose={() => {
            setIsModalOpenEdit(false);
            setSelectedUser(null);
          }}
          size="large"
        >
          <UsersAdminCrud
            data={selectedUser}
            renderField={() => {
              const usernameInput = useInput(selectedUser.username);
              const emailInput = useInput(selectedUser.email);
              const phoneInput = useInput(selectedUser.phone);
              const roleInput = useInput(selectedUser.role);
              const passwordInput = useInput(selectedUser.password)

              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Input
                    type={TypesInput.TEXT}
                    initialValue={usernameInput.value}
                    onChange={usernameInput.handleChange}
                  />
                  <Input
                    type={TypesInput.TEXT}
                    initialValue={emailInput.value}
                    onChange={emailInput.handleChange}
                  />
                  <Input
                    type={TypesInput.TEXT}
                    initialValue={phoneInput.value}
                    onChange={phoneInput.handleChange}
                  />
                  <Input
                    type={TypesInput.TEXT}
                    initialValue={roleInput.value}
                    onChange={roleInput.handleChange}
                  />
                  <Input
                    type={TypesInput.TEXT}
                    initialValue={passwordInput.value}
                    onChange={passwordInput.handleChange}
                  />
                  <Button
                    text="Сохранить изменения"
                    onClick={() =>
                      handleSaveChanges({
                        ...selectedUser,
                        email: String(emailInput.value),
                        phone: String(phoneInput.value),
                        username: String(usernameInput.value),
                        role: String(roleInput.value),
                        password: String(passwordInput.value)
                      })
                    }
                  />
                </div>
              );
            }}
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default UserAdmin;
