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

type Pizza = {
  id: number;
  name: string;
  description: string;
  price_cents: string;
};

const PizzaAdmin = () => {
  const { data, isLoading, sendRequset } = useFetch<Pizza[]>();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const tableContRef = useRef<HTMLDivElement>(null);
  const pizzas = Array.isArray(data) ? data : [];

  const [isOpenModalEdit, setIsModalOpenEdit] = useState(false);
  const [isOpenModalCreate, setIsModalOpenCreate] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const nameInput = useInput("");
  const descriptionInput = useInput("");
  const priceInput = useInput("");

  const handleSaveChanges = async (updatedPizza: Pizza) => {
    await sendRequset(
      `http://localhost:8000/pizzas/${updatedPizza.id}`,
      "put",
      updatedPizza
    );
    await sendRequset("http://localhost:8000/pizzas", "get");
    setIsModalOpenEdit(false);
    setSelectedPizza(null);
  };

  const handleCreatePizza = async () => {
    await sendRequset("http://localhost:8000/pizzas", "post", {
      name: nameInput.value,
      description: descriptionInput.value,
      price_cents: priceInput.value,
    });
    handleCloseModal();
    setIsModalOpenCreate(false);
    await sendRequset("http://localhost:8000/pizzas", "get");
  };

  useEffect(() => {
    sendRequset("http://localhost:8000/pizzas", "get");
  }, []);

  useEffect(() => {
    if (tableContRef.current && scrollPosition > 0) {
      tableContRef.current.scrollTop = scrollPosition;
    }
  }, [data]);

  const handleDelete = async (pizza: Pizza) => {
    if (tableContRef.current) {
      setScrollPosition(tableContRef.current.scrollTop);
    }
    await sendRequset(`http://localhost:8000/pizzas/${pizza.id}`, "delete");
    await sendRequset("http://localhost:8000/pizzas", "get");
  };

  const columns: Column<Pizza>[] = [
    { key: "id", title: "ID", dataIndex: "id" },
    { key: "name", title: "Название", dataIndex: "name" },
    { key: "description", title: "Описание", dataIndex: "description" },
    { key: "price_cents", title: "Цена", dataIndex: "price_cents" },
    {
      key: "actions",
      title: "Действия",
      render: (_, pizza) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            onClick={() => handleDelete(pizza)}
            text="Удалить"
            otherButtonStyles={{
              backgroundColor: "#d32f2f",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
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
              transition: "all 0.3s ease",
            }}
            onClick={() => {
              setSelectedPizza(pizza);
              setIsModalOpenEdit(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          color: "#ff7b25",
          fontSize: "2.5rem",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "2px solid #333",
        }}
      >
        Админ-панель <br />
        Пиццы
      </h2>

      <Button
        text="Добавить пиццу"
        onClick={() => setIsModalOpenCreate(true)}
        otherButtonStyles={{
          backgroundColor: "#ff7b25",
          color: "#121212",
          padding: "0.8rem 1.5rem",
          borderRadius: "8px",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
          marginBottom: "2rem",
        }}
      />

      {isOpenModalCreate && (
        <ModalWindow
          isOpen={isOpenModalCreate}
          onClose={() => setIsModalOpenCreate(false)}
          size="large"
        >
          <div
            style={{
              backgroundColor: "#2a2a2a",
              padding: "2.5rem",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              maxWidth: "100%",
            }}
          >
            <h3
              style={{
                color: "#ff7b25",
                fontSize: "1.8rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Добавить новую пиццу
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label style={{ color: "#ccc", fontSize: "1rem" }}>
                Название пиццы
              </label>
              <Input
                type={TypesInput.TEXT}
                initialValue={nameInput.value}
                onChange={nameInput.handleChange}
                placeholder="Введите название"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label style={{ color: "#ccc", fontSize: "1rem" }}>
                Описание
              </label>
              <Input
                type={TypesInput.TEXT}
                initialValue={descriptionInput.value}
                onChange={descriptionInput.handleChange}
                placeholder="Введите описание"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label style={{ color: "#ccc", fontSize: "1rem" }}>
                Цена (в центах)
              </label>
              <Input
                type={TypesInput.NUMBER}
                initialValue={priceInput.value}
                onChange={priceInput.handleChange}
                placeholder="Введите цену"
              />
            </div>
            <Button
              text="Создать пиццу"
              onClick={handleCreatePizza}
              otherButtonStyles={{
                backgroundColor: "#ff7b25",
                color: "#121212",
                padding: "0.8rem",
                borderRadius: "8px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "1rem",
              }}
            />
          </div>
        </ModalWindow>
      )}

      {isLoading && (
        <p
          style={{
            color: "#ff7b25",
            textAlign: "center",
            fontSize: "1.2rem",
            marginTop: "2rem",
          }}
        >
          Загрузка...
        </p>
      )}

      <div
        ref={tableContRef}
        style={{
          flex: 1,
          overflowY: "auto",
          marginTop: "2rem",
        }}
      >
        {pizzas && <Table<Pizza> data={pizzas} columns={columns} rowKey="id" />}
      </div>

      {isOpenModalEdit && selectedPizza && (
        <ModalWindow
          isOpen={isOpenModalEdit}
          onClose={() => {
            setIsModalOpenEdit(false);
            setSelectedPizza(null);
          }}
          size="large"
        >
          <div
            style={{
              backgroundColor: "#2a2a2a",
              padding: "2rem",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <h3
              style={{
                color: "#ff7b25",
                fontSize: "1.8rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Редактировать пиццу
            </h3>
            <UsersAdminCrud
              data={selectedPizza}
              renderField={() => {
                const nameInput = useInput(selectedPizza.name);
                const descriptionInput = useInput(selectedPizza.description);
                const priceInput = useInput(selectedPizza.price_cents);

                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      <label style={{ color: "#ccc", fontSize: "1rem" }}>
                        Название
                      </label>
                      <Input
                        type={TypesInput.TEXT}
                        initialValue={nameInput.value}
                        onChange={nameInput.handleChange}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      <label style={{ color: "#ccc", fontSize: "1rem" }}>
                        Описание
                      </label>
                      <Input
                        type={TypesInput.TEXT}
                        initialValue={descriptionInput.value}
                        onChange={descriptionInput.handleChange}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      <label style={{ color: "#ccc", fontSize: "1rem" }}>
                        Цена (в центах)
                      </label>
                      <Input
                        type={TypesInput.TEXT}
                        initialValue={priceInput.value}
                        onChange={priceInput.handleChange}
                      />
                    </div>
                    <Button
                      text="Сохранить изменения"
                      onClick={() =>
                        handleSaveChanges({
                          ...selectedPizza,
                          name: String(nameInput.value),
                          description: String(descriptionInput.value),
                          price_cents: String(priceInput.value),
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
                        fontSize: "1rem",
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

export default PizzaAdmin;
