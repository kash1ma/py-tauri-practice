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
  password: string;
};

const UserAdmin = () => {
  const { data, isLoading, sendRequset } = useFetch<User[]>();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const tableContRef = useRef<HTMLDivElement>(null);
  const users = Array.isArray(data) ? data : [];
  const [isOpenModalEdit, setIsModalOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);

  const {value: password, handleChange: handleChangePassword} = useInput("");
  const {value: username, handleChange: handleChangeUsername} = useInput("");
  const {value: email, handleChange: handleChangeEmail} = useInput("");
  const {value: phone, handleChange: handleChangePhone} = useInput("");
  const {value: role, handleChange: handleChangeRole} = useInput("user");

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

  const handleCreateUser = async () => {
    await sendRequset("http://localhost:8000/users", "post", {
      email: email, 
      phone: String(phone), 
      username: username, 
      role: String(role), 
      password: String(password)
    });
    handleCloseModal();
    setIsOpenModalCreate(false);
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
            otherButtonStyles={{ 
              backgroundColor: "#d32f2f", 
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
          />
          <Button
            text="Изменить"
            otherButtonStyles={{ 
              backgroundColor: "#1976d2", 
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
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
    <div style={{
      backgroundColor: "#1e1e1e",
      padding: "2rem",
      minHeight: "100vh"
    }}>
      <h2 style={{
        color: "#ff7b25",
        fontSize: "2.5rem",
        marginBottom: "2rem",
        paddingBottom: "1rem",
        borderBottom: "2px solid #333"
      }}>
        Админ-панель <br />
        Пользователи
      </h2>

      <Button 
        text="Добавить пользователя" 
        onClick={() => setIsOpenModalCreate(true)}
        otherButtonStyles={{
          backgroundColor: "#ff7b25",
          color: "#121212",
          padding: "0.8rem 1.5rem",
          borderRadius: "8px",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
          marginBottom: "2rem"
        }}
      />

      {isOpenModalCreate && (
        <ModalWindow
          isOpen={isOpenModalCreate}
          onClose={() => setIsOpenModalCreate(false)}
          size="large"
        >
          <div style={{
            backgroundColor: "#2a2a2a",
            padding: "2rem",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: "100%",
          }}>
            <h3 style={{
              color: "#ff7b25",
              fontSize: "1.8rem",
              marginBottom: "1rem",
              textAlign: "center"
            }}>Добавить нового пользователя</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ color: "#ccc", fontSize: "1rem" }}>Имя пользователя</label>
              <Input
                type={TypesInput.TEXT}
                onChange={handleChangeUsername}
                initialValue={username}
                placeholder="Введите имя"
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ color: "#ccc", fontSize: "1rem" }}>Email</label>
              <Input
                type={TypesInput.EMAIL}
                onChange={handleChangeEmail}
                initialValue={email}
                placeholder="Введите email"
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ color: "#ccc", fontSize: "1rem" }}>Телефон</label>
              <Input
                type={TypesInput.NUMBER}
                onChange={handleChangePhone}
                initialValue={phone}
                placeholder="Введите телефон"
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ color: "#ccc", fontSize: "1rem" }}>Роль</label>
              <Input
                type={TypesInput.TEXT}
                onChange={handleChangeRole}
                initialValue={role}
                placeholder="Введите роль (user/admin)"
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ color: "#ccc", fontSize: "1rem" }}>Пароль</label>
              <Input
                type={TypesInput.TEXT}
                onChange={handleChangePassword}
                initialValue={password}
                placeholder="Введите пароль"
              />
            </div>
            
            <Button 
              text="Создать пользователя" 
              onClick={handleCreateUser}
              otherButtonStyles={{
                backgroundColor: "#ff7b25",
                color: "#121212",
                padding: "0.8rem",
                borderRadius: "8px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "1rem"
              }}
            />
          </div>
        </ModalWindow>
      )}

      {isLoading && <p style={{
        color: "#ff7b25",
        textAlign: "center",
        fontSize: "1.2rem",
        marginTop: "2rem"
      }}>Загрузка...</p>}
      
      <div
        ref={tableContRef}
        style={{
          flex: 1,
          overflowY: "auto",
          marginTop: "2rem"
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
          <div style={{
            backgroundColor: "#2a2a2a",
            padding: "2rem",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            <h3 style={{
              color: "#ff7b25",
              fontSize: "1.8rem",
              marginBottom: "1rem",
              textAlign: "center"
            }}>Редактировать пользователя</h3>
            <UsersAdminCrud
              data={selectedUser}
              renderField={() => {
                const usernameInput = useInput(selectedUser.username);
                const emailInput = useInput(selectedUser.email);
                const phoneInput = useInput(selectedUser.phone);
                const roleInput = useInput(selectedUser.role);
                const passwordInput = useInput(selectedUser.password);

                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ color: "#ccc", fontSize: "1rem" }}>Имя пользователя</label>
                      <Input
                        type={TypesInput.TEXT}
                        initialValue={usernameInput.value}
                        onChange={usernameInput.handleChange}
                      />
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ color: "#ccc", fontSize: "1rem" }}>Email</label>
                      <Input
                        type={TypesInput.TEXT}
                        initialValue={emailInput.value}
                        onChange={emailInput.handleChange}
                      />
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ color: "#ccc", fontSize: "1rem" }}>Телефон</label>
                      <Input
                        type={TypesInput.TEXT}
                        initialValue={phoneInput.value}
                        onChange={phoneInput.handleChange}
                      />
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ color: "#ccc", fontSize: "1rem" }}>Роль</label>
                      <Input
                        type={TypesInput.TEXT}
                        initialValue={roleInput.value}
                        onChange={roleInput.handleChange}
                      />
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ color: "#ccc", fontSize: "1rem" }}>Пароль</label>
                      <Input
                        type={TypesInput.TEXT}
                        initialValue={passwordInput.value}
                        onChange={passwordInput.handleChange}
                      />
                    </div>
                    
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
                      otherButtonStyles={{
                        backgroundColor: "#ff7b25",
                        color: "#121212",
                        padding: "0.8rem",
                        borderRadius: "8px",
                        fontWeight: "600",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "1rem"
                      }}
                    />
                  </div>
                );
              }}
            />
          </div>
        </ModalWindow>
      )}
    </div>
  );
};

export default UserAdmin;