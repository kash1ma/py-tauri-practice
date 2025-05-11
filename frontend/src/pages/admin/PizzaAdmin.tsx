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

  // 👇 состояния для создания новой пиццы
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
            otherButtonStyles={{ backgroundColor: "red", color: "white" }}
          />
          <Button
            text="Изменить"
            otherButtonStyles={{ backgroundColor: "blue", color: "white" }}
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
    <div ref={tableContRef} style={{ maxHeight: "100vh", overflow: "auto" }}>
      <h2
        style={{
          color: "rgb(234, 124, 105)",
          padding: "10px",
          fontSize: "50px",
        }}
      >
        Админ-панель <br />
        Пиццы
      </h2>

      {/* 👇 Кнопка для добавления */}
      <Button text="Добавить пиццу" onClick={() => setIsModalOpenCreate(true)} />

      {isOpenModalCreate && (
        <ModalWindow
          isOpen={isOpenModalCreate}
          onClose={() => setIsModalOpenCreate(false)}
          size="large"
        >
          <Input
            type={TypesInput.TEXT}
            initialValue={nameInput.value}
            onChange={nameInput.handleChange}
            placeholder="Название пиццы"
          />
          <Input
            type={TypesInput.TEXT}
            initialValue={descriptionInput.value}
            onChange={descriptionInput.handleChange}
            placeholder="Описание"
          />
          <Input
            type={TypesInput.NUMBER}
            initialValue={priceInput.value}
            onChange={priceInput.handleChange}
            placeholder="Цена в центах"
          />
          <Button text="Создать пиццу" onClick={handleCreatePizza} />
        </ModalWindow>
      )}

      {isLoading && <p>Загрузка...</p>}
      <div
        ref={tableContRef}
        style={{
          flex: 1,
          overflowY: "scroll",
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
          <UsersAdminCrud
            data={selectedPizza}
            renderField={() => {
              const nameInput = useInput(selectedPizza.name);
              const descriptionInput = useInput(selectedPizza.description);
              const priceInput = useInput(selectedPizza.price_cents);

              return (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Input
                    type={TypesInput.TEXT}
                    initialValue={nameInput.value}
                    onChange={nameInput.handleChange}
                  />
                  <Input
                    type={TypesInput.TEXT}
                    initialValue={descriptionInput.value}
                    onChange={descriptionInput.handleChange}
                  />
                  <Input
                    type={TypesInput.TEXT}
                    initialValue={priceInput.value}
                    onChange={priceInput.handleChange}
                  />
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

export default PizzaAdmin;
